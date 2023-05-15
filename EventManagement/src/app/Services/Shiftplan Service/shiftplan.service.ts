import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShiftplanService {


  categoryNames: Subject<string []> = new Subject<string[]>();
  

  dummyNames = ["Bar", "Sicherheit", "Bühne 1","buu"];

  categoriesContent = [
    new CategoryContent(0, "this.categoryNames[1]", [new Shift(0, 0, []), new Shift(0, 0, []), new Shift(0, 0, []), new Shift(0, 0, [])]),
    new CategoryContent(0, "this.categoryNames[3]", []),
    new CategoryContent(0, "this.categoryNames[1]", []),
    new CategoryContent(0, "this.categoryNames[2]", [])

  ];


  constructor(private http: HttpClient) { 
    
  }

  updateCategoryNames(){
    console.log("works")
    this.http.get("http://localhost:3000/shiftCategory/names/1").subscribe((res) =>{

    const shiftCategorys = JSON.parse(JSON.stringify(res));
    const catNames: string[] = shiftCategorys.map((category: any) => category.name);
    console.log("bbb: ", catNames)
    this.categoryNames.next(catNames);
    
    
    
    })

    console.log(this.categoryNames)
  }

  getCategorys(){

  }
}
