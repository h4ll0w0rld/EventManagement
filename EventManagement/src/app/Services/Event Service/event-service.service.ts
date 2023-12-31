import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, interval, switchMap } from 'rxjs';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { User } from 'src/app/Object Models/user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventModel } from 'src/app/Object Models/EventModel';
import { ConfigService } from '../config.service';
import { AuthService } from '../Auth Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService implements AfterViewInit, OnInit {

  currentEvent: EventModel = new EventModel(-1, "", "", new Date(), new Date(), "")
  private refreshInterval: Subscription = Subscription.EMPTY;;
  currentEventSubject: BehaviorSubject<EventModel> = new BehaviorSubject<EventModel>(new EventModel(-1, "", "", new Date(), new Date(), ""));
  currentEvent$ = this.currentEventSubject.asObservable();

  currentCatSubject: BehaviorSubject<CategoryContent> = new BehaviorSubject<CategoryContent>(new CategoryContent(-1, "", "", -1, []));
  currentCat$ = this.currentCatSubject.asObservable();
  currCat: CategoryContent = new CategoryContent(1, "", "", -1, []);

  loggedInUser: User = new User(-1, "", "", "", "");
  availableUser: Subject<User[]> = new Subject<User[]>();
  allUser: Subject<User[]> = new Subject<User[]>();
  categories: Subject<CategoryContent[]> = new Subject<CategoryContent[]>();

  userList: Subject<User[]> = new Subject<User[]>();



  constructor(private http: HttpClient, private conf: ConfigService, private authService: AuthService) {
    const storedEvent = localStorage.getItem('event');
    const initialEvent = storedEvent ? JSON.parse(storedEvent) : new EventModel(-1, "", "", new Date(), new Date(), "");
    if (initialEvent.id != -1) this.setCurrentEvent(initialEvent)
    const storedUser = localStorage.getItem('user')
    const loggedInUser: User = storedUser ? JSON.parse(storedUser) : new User(-1, "", "", "", "")
    if (loggedInUser.uuid != -1) this.authService.setLoggedInUser(loggedInUser)

    const storedCurrCat = localStorage.getItem('cat');
    const initCat = storedCurrCat ? JSON.parse(storedCurrCat) : new CategoryContent(1, "", "", 7, []);
    if (initCat.id != -1) this.setCurrCat(initCat);

    this.getCurrentEvent().subscribe((currentEvent: EventModel) => {
      this.currentEvent = currentEvent;
    })
    this.getCurrCat().subscribe((currCat: CategoryContent) => {
      this.currCat = currCat;

    })

  }

  setCurrentEvent(_event: EventModel) {
    this.currentEventSubject.next(_event)

  }

  getCurrentEvent(): Observable<EventModel> {
    return this.currentEvent$;
  }

  setCurrCat(_cat: CategoryContent) {
    this.currentCatSubject.next(_cat)
  }
  getCurrCat(): Observable<CategoryContent> {
    return this.currentCat$;
  }

  updateCategories() {

    if (this.currentEvent.id != -1) {
      ///shiftCategory/:current_event_id/all
      console.log("starting for event NR: ", this.currentEvent.id)
      this.http.get<any>(this.conf.rootUrl + "/shiftCategory/" + this.currentEvent.id + "/all", this.authService.getAuthHeader()).subscribe((res: any) => {

        const shiftCategorys = JSON.parse(JSON.stringify(res));

        const cats: CategoryContent[] = shiftCategorys.shift_categories.map((category: any) => {
          const shifts: Shift[] = category.shifts.map((shift: any) => {
            const activities: Activity[] = shift.activities.map((activity: any) => {
              const user: User = new User(activity.user?.id, activity.user?.firstName, activity.user?.lastName, activity.user?.email, activity.user?.password);
              const mappedActivity: Activity = new Activity(activity.id, user, true);
              return mappedActivity;
            });

            const mappedShift: Shift = new Shift(shift.id, shift.startTime, shift.endTime, activities, shift.isActive);
            return mappedShift;
          });

          const mappedCategoryContent: CategoryContent = new CategoryContent(
            category.id,
            category.name,
            category.description,
            category.interval,
            shifts
          );
          return mappedCategoryContent;
        });

        this.categories.next(cats);

      })


    } else {
      //Id -1 
      this.eventFromLS();
      console.log("No Event Selected (UpdateCat)");
    }



  }

  getRoles() {
    this.http.get(this.conf.rootUrl + "/permission/" + this.currentEvent.id + "/getRoles").subscribe(res => {
      console.log(res)
    })
  }

  addCategory(_name: string, _description: string, _eventId: number, _shiftBlocks: any[]) {



    if (this.currentEvent.id != -1) {

      const data = {
        name: _name,
        description: _description,
        event_id: _eventId,
        shiftBlocks: _shiftBlocks,
      }

      this.http.post(this.conf.rootUrl + "/shiftCategory/" + this.currentEvent.id + "/add", data, this.authService.getAuthHeader()).subscribe((res: any) => {
        this.updateCategories();

      })
    } else {
      console.log("EventID = ", this.currentEvent.id)
    }


  }
  // addCategory(_name: string, _description: string, _eventId: number, _shiftBlocks: any[]) {
  //   this.getCurrentEvent().subscribe((currentEvent: EventModel) => {
  //     if (currentEvent && currentEvent.id !== -1) {
  //       this.addCategoryToEvent(_name, _description, currentEvent.id, _shiftBlocks);
  //     } else {
  //       console.log("EventID = ", currentEvent?.id);
  //     }
  //   });
  // }

  // private addCategoryToEvent(name: string, description: string, eventId: number, shiftBlocks: any[]) {
  //   console.log("Fireeeeee")
  //   const data = {
  //     name: name,
  //     description: description,
  //     event_id: eventId,
  //     shiftBlocks: shiftBlocks,
  //   };





  delCategory(_id: number) {



    if (this.currentEvent.id != -1) {
      this.http.delete(this.conf.rootUrl + "/shiftCategory/" + this.currentEvent.id + "/delete/id/" + _id, this.authService.getAuthHeader()).subscribe((res: any) => {

        this.updateCategories();
      })
    }


  }

  addUserToActivity(_activityId: number, _userId: number, _shiftId: number) {

    if (this.currCat.id != -1 && this.currentEvent.id != -1) {
      this.http.put(this.conf.rootUrl + "/activity/" + this.currentEvent.id + "/addUser/shift_category_id/" + this.currCat.id + "/activity_id/" + _activityId + "/user_id/" + _userId, {}, this.authService.getAuthHeader()).subscribe(() => {

        // this.updateShift(_shiftId);
      })
    }
  }

  regUserForActivity(_activityId: number, _userId: number, _shiftId: number) {
    //   /activity/:current_event_id/requestUser/shift_category_id/:shift_category_id/activity_id/:activity_id/user_id/:user_id
    if (this.currCat.id != -1 && this.currentEvent.id != -1) {
      this.http.put(this.conf.rootUrl + "/activity/" + this.currentEvent.id + "/requestUser/shift_category_id/" + this.currCat.id + "/activity_id/" + _activityId + "/user_id/" + _userId, {}, this.authService.getAuthHeader()).subscribe(req => {
        console.log("Response", req)
      })
    }


  }

  delUserFromActivity(_activityId: number, _userId: number, _shiftId: number): void {
    ///activity/:current_event_id/removeUser/shift_category_id/:shift_category_id/activity_id/:activity_id
    if (this.currCat.id != -1 && this.currentEvent.id != -1) {
      console.log("Event: ", this.currentEvent.id, "Cat: ", this.currCat.id)
      this.http.put(this.conf.rootUrl + "/activity/" + this.currentEvent.id + "/removeUser/shift_category_id/" + this.currCat.id + "/activity_id/" + _activityId, {}, this.authService.getAuthHeader()).subscribe(() => {
        // this.updateShift(_shiftId);
      })
    }

  }

  addShiftBlockToCategory(_newBlock: any, _catID: number) {

    const data = {
      shiftBlocks: [
        {
          intervall: _newBlock.intervall,
          activitiesPerShift: _newBlock.activitiesPerShift,
          numberOfShifts: _newBlock.numberOfShifts,
          startTime: _newBlock.startTime,
          endTime: _newBlock.endTime
        }
      ]
    }
    console.log(data, _catID);


    if (this.currentEvent.id != -1) {
      this.http.post(this.conf.rootUrl + '/shiftCategory/' + this.currentEvent.id + '/addShiftBlockToCategory/shift_category_id/' + _catID, data, this.authService.getAuthHeader()).subscribe((res: any) => {
        this.updateCategories()
      })
    }

  }

  addUser(_firstName: string, _lastName: string) {


    if (this.currentEvent.id != -1) {

      this.http.post(this.conf.rootUrl + "/user/" + this.currentEvent.id + "/add/", {
        "firstName": _firstName,
        "lastName": _lastName

      }, this.authService.getAuthHeader()).subscribe((res: any) => {
        console.log("REsponsee: ", res)

        //this.userToEvent(res.data.id)

      })
    }



  }

  userToEvent(_userID: number) {


    if (this.currentEvent.id != -1) {

      this.http.get(this.conf.rootUrl + "/event/addUserToEvent/event_id/" + this.currentEvent.id + "/user_id/" + _userID, this.authService.getAuthHeader()).subscribe((res: any) => {
        console.log("heho le user est: ", this.loggedInUser)
        console.log(res)

      })
    }


  }

  delUser(_id: number) {

    this.http.delete(this.conf.rootUrl + "/user/delete/user_id/" + _id, this.authService.getAuthHeader()).subscribe(() => {

      console.log("successfully deleted");
    });

  }

  getAllUser() {
    //   /event/:current_event_id/allUsersByEvent

    if (this.currentEvent.id != -1) {
      this.http.get(this.conf.rootUrl + '/event/' + this.currentEvent.id + '/allUsersByEvent/', this.authService.getAuthHeader()).subscribe((res: any) => {
        const users: User[] = res.map((user: any) => new User(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.password

        ));
        this.allUser.next(users);
      }

      );
    }



  }

  getAvailableUser(_shiftCatId: number, _activityId: number) {


    if (this.currentEvent.id != -1 && this.currCat.id != -1) {
      console.log("cuuCar: ", this.currCat)
      // /activity/:current_event_id/availableUsers/shift_category_id/:shift_category_id/activity_id/:activity_id
      this.http.get(this.conf.rootUrl + '/activity/' + this.currentEvent.id + '/availableUsers/shift_category_id/' + this.currCat.id + '/activity_id/' + _activityId, this.authService.getAuthHeader()).subscribe((res: any) => {
        const users: User[] = res.map((user: any) => new User(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.password

        ));
        this.availableUser.next(users);
      }

      );
    } else if (this.currCat.id == -1) console.log("No cat selected")
    else console.log("No event selected")



  }


  userToActivity() {

    const data = {
      "user": 22,
      "endTime": 24,
      "event_id": 1
    }

    this.http.post(this.conf.rootUrl + '/shift/add', data, this.authService.getAuthHeader()).subscribe((res: any) => {
      console.log("adding shift went: ", res)
    })
  }
  eventFromLS() {
    const eventString = localStorage.getItem("event");
    if (eventString !== null)
      this.currentEvent = JSON.parse(eventString)

  }
  ngAfterViewInit() {
    console.log("Happening")



    if (this.currentEvent.id == -1) {
      console.log("Happening")
      const eventString = localStorage.getItem("event");
      if (eventString !== null)
        this.currentEvent = JSON.parse(eventString)
    }


  }
  ngOnInit() {
    this.eventFromLS();
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    })


    const intervalTime = 5000;

    this.refreshInterval = interval(intervalTime).pipe(
      switchMap(async () => this.updateCategories()) // Replace 'fetchData()' with your API call method
    ).subscribe(
      (data) => {
        // Handle the fetched data (e.g., update component properties)
        // Example: this.data = data;
      },
      (error) => {
        // Handle errors if any
        console.error('Error fetching data:', error);
      }
    );


  }

}


