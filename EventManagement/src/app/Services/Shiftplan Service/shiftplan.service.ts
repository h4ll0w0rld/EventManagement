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
  
  categories: Subject<CategoryContent[]> = new Subject<CategoryContent[]>();

  dummyNames = ["Bar", "Sicherheit", "Bühne 1","buu"];
  //Dummy Data
  categoriesContent = categoriesContent;

  rootUrl:string = 'http://localhost:3000';
 

  constructor(private http: HttpClient) { 
    
  }
  

  updateCategorieNames(){

    this.http.get(this.rootUrl + "/shiftCategory/names/1").subscribe((res) =>{
   
    const shiftCategorys = JSON.parse(JSON.stringify(res));
    const catNames: string[] = shiftCategorys.map((category: any) => category.name);
    this.categoryNames.next(catNames);

    })

    console.log(this.categoryNames)
  }



  updateCategories():void{

    this.http.get<any>(this.rootUrl + '/shiftCategory/all/event_id/1').subscribe((res: any) => {

        const shiftCategorys = JSON.parse(JSON.stringify(res));
  
        const cats: CategoryContent[] = shiftCategorys.shiftCategories.map((category: any) => {
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
  addCategory(_name:string, _description:string){
    let params : HttpParams = new HttpParams().set('name', _name).set('description', _description).set('event_id', '1');
    const data = {
      name: _name,
      description: _description,
      event_id: 1

    }
    this.http.post(this.rootUrl + '/shiftCategory/add', data).subscribe((res) => {
      this.updateCategories();
      console.log("added category: ", res)
    })

  }

  delCategory(_id:number){
    this.http.delete(this.rootUrl + "/shiftCategory/delete/id/" + _id).subscribe((res) => {
      console.log(res)
    })

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


