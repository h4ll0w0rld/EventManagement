import { AfterViewInit, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
export class EventServiceService implements AfterViewInit{

  currentEvent:EventModel = new EventModel(-1, "", "", new Date(), new Date(), "")
  availableUser: Subject<User[]> = new Subject<User[]>();
  allUser: Subject<User[]> = new Subject<User[]>();
  categories: Subject<CategoryContent[]> = new Subject<CategoryContent[]>();

  userList: Subject<User[]> = new Subject<User[]>();


  
  constructor(private http: HttpClient, private conf:ConfigService, private authService:AuthService) { 

    

  }

  updateCategories() {

    this.http.get<any>(this.conf.rootUrl + '/shiftCategory/all/event_id/' + this.currentEvent.id, this.authService.getAuthHeader()).subscribe((res: any) => {

      const shiftCategorys = JSON.parse(JSON.stringify(res));

      const cats: CategoryContent[] = shiftCategorys.shift_categories.map((category: any) => {
        const shifts: Shift[] = category.shifts.map((shift: any) => {
          const activities: Activity[] = shift.activities.map((activity: any) => {
            const user: User = new User(activity.user?.id, activity.user?.firstName, activity.user?.lastName, activity.user?.email ,activity.user?.password);
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

  }

  addCategory(_name: string, _description: string, _eventId: number, _shiftBlocks: any[]) {

    const data = {
      name: _name,
      description: _description,
      event_id: _eventId,
      shiftBlocks: _shiftBlocks,
    }

    this.http.post(this.conf.rootUrl + "/shiftCategory/"+ this.currentEvent.id +"/add", data, this.authService.getAuthHeader()).subscribe((res: any) => {
      this.updateCategories();
      
    })
  }

  delCategory(_id: number) {
    this.http.delete(this.conf.rootUrl + "/shiftCategory/delete/id/" + _id, this.authService.getAuthHeader()).subscribe((res: any) => {

      this.updateCategories();
    })

  }

  addUserToActivity(_activityId: number, _userId: number, _shiftId: number) {

    this.http.put(this.conf.rootUrl + "/activity/addUser/activity_id/" + _activityId + "/user_id/" + _userId, {}, this.authService.getAuthHeader()).subscribe(() => {

     // this.updateShift(_shiftId);
    })

  }

  delUserFromActivity(_activityId: number, _userId: number, _shiftId: number): void {
    this.http.put(this.conf.rootUrl + "/activity/removeUser/activity_id/" + _activityId, {}, this.authService.getAuthHeader()).subscribe(() => {
     // this.updateShift(_shiftId);
    })

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

    this.http.post(this.conf.rootUrl + '/shiftCategory/addShiftBlockToCategory/shift_category_id/' + _catID, data, this.authService.getAuthHeader()).subscribe((res: any) => {
      this.updateCategories()
    })
  }

  addUser(_firstName: string, _lastName: string) {
  
    this.http.post(this.conf.rootUrl + "/user/add", {
      "firstName": _firstName,
      "lastName": _lastName

    }, this.conf.getAuthHeader()).subscribe((res: any) => {
      
      this.userToEvent(res.data.id)

    })

  }

  userToEvent(_userID:number){
    this.http.get(this.conf.rootUrl + "/event/addUserToEvent/event_id/" + this.currentEvent.id + "/user_id/"+ _userID, this.authService.getAuthHeader()).subscribe((res: any) => {

      console.log(res)

    })

  }

  delUser(_id: number) {
    this.http.delete(this.conf.rootUrl + "/user/delete/user_id/" + _id, this.authService.getAuthHeader()).subscribe(() => {
      
      console.log("successfully deleted");
    });

  }

  getAllUser() {

    return this.http.get(this.conf.rootUrl + '/event/allUsersByEvent/event_id/' + this.currentEvent.id, this.authService.getAuthHeader()).subscribe((res: any) => {
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

  getAvailableUser(_eventId: number = 1, _activityId: number) {
    console.log("Meine Event id: ", this.currentEvent.id)
    return this.http.get(this.conf.rootUrl + '/activity/availableUsers/event_id/' + this.currentEvent.id + '/activity_id/' + _activityId, this.authService.getAuthHeader()).subscribe((res: any) => {
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

  ngAfterViewInit(){
    if(this.currentEvent.id == -1){
      const eventString = localStorage.getItem("event");
      if(eventString!== null)
        this.currentEvent = JSON.parse(eventString)
    }
  }
}


