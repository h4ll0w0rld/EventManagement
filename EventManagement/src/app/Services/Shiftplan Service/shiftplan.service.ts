import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { Observable, Subject } from 'rxjs';
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


  constructor(private http: HttpClient) { 
    
  }

  updateCategorieNames(){

    this.http.get("http://localhost:3000/shiftCategory/names/1").subscribe((res) =>{

    const shiftCategorys = JSON.parse(JSON.stringify(res));
    const catNames: string[] = shiftCategorys.map((category: any) => category.name);
    this.categoryNames.next(catNames);
    
    
    
    })

    console.log(this.categoryNames)
  }


  updateCategories(){
    this.categories.next(this.categoriesContent);

  }
}
