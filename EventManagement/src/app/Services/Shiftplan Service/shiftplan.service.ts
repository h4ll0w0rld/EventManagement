import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { BehaviorSubject, Subject, last } from 'rxjs';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/user';
import { categoriesContent } from "../../testData/shiftPlanDummy";
import { AuthService } from '../Auth/auth-service.service';



// @Injectable({
//   providedIn: 'root'
// })
export class ShiftplanService {


  categoryNames: Subject<string[]> = new Subject<string[]>();
  user: Subject<User[]> = new Subject<User[]>();
  categoryCopy: CategoryContent[] = [];
  categories: Subject<CategoryContent[]> = new Subject<CategoryContent[]>();
  availableUser: Subject<User[]> = new Subject<User[]>();
  allUser:Subject<User[]> = new Subject<User[]>();

  categoriesContent = categoriesContent;
  rootUrl: string = 'http://192.52.42.200:3000';

   username = 'projektle';
     password = 'ventit23';
     encodedCredentials = btoa(`${this.username}:${this.password}`);
     headers = new HttpHeaders({
      'Authorization': 'Basic ' + this.encodedCredentials
    });

     options = { headers: this.headers };

  editmode: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private authService: AuthService) {

    const stored = localStorage.getItem('editmode');
    const value = stored !== null ? JSON.parse(stored) : false;
    this.editmode = new BehaviorSubject<boolean>(value);
    //this.makeAuthenticatedRequest()

  }
  makeAuthenticatedRequest() {
    this.authService.authenticate().subscribe(() => {
      // Handle the API response here
    });
  }
  get editmode$() {

    return this.editmode.asObservable();
  }

  updateEditmode(_curValue: boolean) {
    const curValue = this.editmode.getValue();
    this.editmode.next(_curValue);
    localStorage.setItem('editmode', JSON.stringify(_curValue));
  }


  // updateCategorieNames(){

  //   this.http.get(this.rootUrl + "/shiftCategory/names/1").subscribe((res) =>{

  //   const shiftCategorys = JSON.parse(JSON.stringify(res));
  //   const catNames: string[] = shiftCategorys.map((category: any) => category.name);
  //   this.categoryNames.next(catNames);

  //   })

  //   console.log(this.categoryNames)
  // }


  updateCategories(): void {
   
    
    this.http.get<any>(this.rootUrl + '/shiftCategory/all/event_id/1', this.options).subscribe((res: any) => {

      const shiftCategorys = JSON.parse(JSON.stringify(res));

      const cats: CategoryContent[] = shiftCategorys.shift_categories.map((category: any) => {
        const shifts: Shift[] = category.shifts.map((shift: any) => {
          const activities: Activity[] = shift.activities.map((activity: any) => {
            const user: User = new User(activity.user?.id, activity.user?.firstName, activity.user?.lastName);
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
      this.categoryCopy = cats;
      this.categories.next(cats);
    },

      (error: any) => {

        console.error(error);
        this.categories.next(categoriesContent)
      }
    );

  }


  addCategory(_name: string, _description: string, _intervall: number, _numbActivities: number, _startTime: string, _endTime: string, _days: any) {

    const data = {
      name: _name,
      description: _description,
      intervall: _intervall,
      activitiesPerShift: _numbActivities,
      startTime: _startTime,
      endTime: _endTime,
      days: this.generateDateRange("2023-08-10", "2023-08-12"),           //["2023-08-10", "2023-08-11", "2023-08-12"]
      event_id: 1

    }
   
    this.http.post(this.rootUrl + '/shiftCategory/add', data, this.options).subscribe((res:any) => {
      this.updateCategories();
      console.log("added category")
    })

  }

  delCategory(_id: number) {
    this.http.delete(this.rootUrl + "/shiftCategory/delete/id/" + _id, this.options).subscribe((res:any) => {
      
      this.updateCategories();
    })

  }

  generateDateRange(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
  
    while (currentDate <= lastDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  }


  addUserToActivity(_activityId: number, _userId: number, _shiftId:number) {
   
    this.http.put(this.rootUrl + "/activity/addUser/activity_id/" + _activityId + "/user_id/" + _userId, {}, this.options).subscribe(() => {
   
      this.updateShift(_shiftId);
    })

  }

  delUserFromActivity(_activityId: number, _userId: number, _shiftId:number): void {
    this.http.put(this.rootUrl + "/activity/removeUser/activity_id/" + _activityId,{}, this.options).subscribe(() => {
      this.updateShift(_shiftId);
    })

  }

  updateShift(_id:number){

    this.http.get<any>(this.rootUrl + "/shift/shift_id/" + _id, this.options).subscribe((response:any) => {

      const shift = new Shift(
        response.id,
        response.startTime,
        response.endTime,
        response.activities.map((activity: any) => {
          const user = new User(
            activity.user?.id,
            activity.user?.firstName,
            activity.user?.lastName
          );
         
          return new Activity(activity.id, user, activity.status);
        }),
        response.isActive
      );
  
      this.updateShiftById(_id, shift);
      this.categories.next(this.categoryCopy);
    })
  }

  updateShiftById(shiftId: number, updatedShift: Shift): void {
    this.categoryCopy.forEach((category: CategoryContent) => {
      const shiftIndex = category.shifts.findIndex((shift: Shift) => shift.id === shiftId);
      if (shiftIndex !== -1) {
        category.shifts[shiftIndex] = updatedShift;
      }
    });
  }
  
  shiftOnOff(_shiftId: number, isActive:boolean ){

    this.http.put(this.rootUrl + "/shift/setActive/ " + isActive + "/shift_id/" + _shiftId, {}, this.options ).subscribe(() => {
      
      console.log("isActive changed to: " + isActive);

    })

  }

  addUser(_firstName: string, _lastName:string){
    
    this.http.post(this.rootUrl + "/user/add", {
      "firstName":_firstName,
      "lastName": _lastName

    }, this.options).subscribe(() => {
     
      console.log("Added User: ", _firstName);

    })

  }

  delUser(_id:number){
    this.http.delete(this.rootUrl + "/user/delete/user_id/" + _id, this.options).subscribe(() => {
     
       console.log("successfully deleted");
    });
    
  }

  getAllUser() {

    return this.http.get(this.rootUrl + '/user/all', this.options).subscribe((res: any) => {
      const users: User[] = res.map((user: any) => new User(
        user.id,
        user.firstName,
        user.lastName,

      ));
      this.allUser.next(users);
    }

    );

  }

  getAvailableUser(_eventId:number = 1, _activityId: number){

    return this.http.get(this.rootUrl + '/activity/availableUsers/event_id/'+_eventId +'/activity_id/'+ _activityId, this.options).subscribe((res: any) => {
      const users: User[] = res.map((user: any) => new User(
        user.id,
        user.firstName,
        user.lastName,

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

    this.http.post(this.rootUrl + '/shift/add', data, this.options).subscribe((res:any) => {
      console.log("adding shift went: ", res)
    })
  }
}


