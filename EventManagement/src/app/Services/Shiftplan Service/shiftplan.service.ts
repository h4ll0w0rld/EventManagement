import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { Observable, Subject, map } from 'rxjs';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/shiftplanModel';
import { categoriesContent } from "../../testData/shiftPlanDummy";


@Injectable({
  providedIn: 'root'
})
export class ShiftplanService {


  categoryNames: Subject<string []> = new Subject<string[]>();
  user: Subject<User []> = new Subject<User[]>();
  
  categories: Subject<CategoryContent[]> = new Subject<CategoryContent[]>();

  dummyNames = ["Bar", "Sicherheit", "Bühne 1","buu"];
  //Dummy Data
  categoriesContent = categoriesContent;

  rootUrl:string = 'http://localhost:3000';
 

  constructor(private http: HttpClient) { 
    
  }
  

  // updateCategorieNames(){

  //   this.http.get(this.rootUrl + "/shiftCategory/names/1").subscribe((res) =>{
   
  //   const shiftCategorys = JSON.parse(JSON.stringify(res));
  //   const catNames: string[] = shiftCategorys.map((category: any) => category.name);
  //   this.categoryNames.next(catNames);

  //   })

  //   console.log(this.categoryNames)
  // }



  updateCategories():void{

    this.http.get<any>(this.rootUrl + '/shiftCategory/all/event_id/1').subscribe((res: any) => {

        const shiftCategorys = JSON.parse(JSON.stringify(res));
  
        const cats: CategoryContent[] = shiftCategorys.shift_categories.map((category: any) => {
          const shifts: Shift[] = category.shifts.map((shift: any) => {
            const activities: Activity[] = shift.activities.map((activity: any) => {
              const user: User = new User(activity.user?.id, activity.user?.firstName, activity.user?.lastName);
              const mappedActivity: Activity = new Activity(activity.id, user, true);
              return mappedActivity;
            });
  
            const mappedShift: Shift = new Shift(shift.startTime, shift.endTime, activities);
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
      },

      (error: any) => {
   
        console.error(error);
        this.categories.next(categoriesContent)
      }
    );

  }
  addCategory(_name:string, _description:string, _intervall: number, _numbActivities:number,_startTime:string, _endTime:string, _days:any){
    
    const data = {
      name: _name,
      description: _description,
      intervall: _intervall,
      activitiesPerShift: _numbActivities,
      startTime:_startTime,
      endTime: _endTime,
      days: ["2023-08-10", "2023-08-11", "2023-08-12"],   //FIX when event can be added manual
      event_id: 1

    }
    console.log("Data: ", data)
    this.http.post(this.rootUrl + '/shiftCategory/add', data).subscribe((res) => {
      this.updateCategories();
      console.log("added category: ", res)
    })

  }

  delCategory(_id:number){
    this.http.delete(this.rootUrl + "/shiftCategory/delete/id/" + _id).subscribe((res) => {
      console.log(res)
      this.updateCategories();
    })

  }


  addUserToActivity(_activityId: number, _userId: number){
    console.log("calliong: ", this.rootUrl + "/activity/addUser/activity_id/" + _activityId +"/user_id/" + 1)
    this.http.put(this.rootUrl + "/activity/addUser/activity_id/" + _activityId +"/user_id/" + 1, {}).subscribe(() => {
      this.updateCategories();
    })

  }

  delUserFromActivity(_activityId: number, _userId: number): void{
    this.http.put(this.rootUrl + "/activity/removeUser/activity_id/" + _activityId, {}).subscribe(() => {
      this.updateCategories();
    })

  }

  getAllUser(): Observable<User[]> {
    return this.http.get(this.rootUrl + '/user/all').pipe(
      map((response: any) => {
        // Perform any data transformation or manipulation if needed
        return response;
      })
    );

  }



  userToActivity(){

    const data = {
      "user": 22,
      "endTime": 24,
      "event_id": 1
    }

    this.http.post(this.rootUrl + '/shift/add', data).subscribe((res) => {
      console.log("adding shift went: " , res)
    })
  }
}


