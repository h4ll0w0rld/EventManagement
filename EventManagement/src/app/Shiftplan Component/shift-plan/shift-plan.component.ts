import { Component } from '@angular/core';

import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss'],
  providers: [DatePipe]
})


export class ShiftPlanComponent {



  shiftCategoryNames = ["Bar1", "Bar2", "Bar3"];
  value = 'Bar2';
  shiftCategorie:CategoryContent[] = [];

  categoryName: string = '';
  description: string = '';
  interval: number = 60;
  numberOfActivities: number = 2;
  startTime = "00:00";
  endTime = "23:00";
  chosenDate: Date = new Date();
  constructor(public shiftplanService: ShiftplanService, private datePipe: DatePipe) {
 
  }

  addCat(): void {

    const date = this.datePipe.transform(this.chosenDate, "yyyy-MM-dd");
    this.shiftplanService.addCategory(this.categoryName, this.description, this.interval, this.numberOfActivities,this.startTime, this.endTime, date)
    this.shiftplanService.updateCategories();
    
    this.updateCat();
  }

  delCategory(_id:number){
    this.shiftplanService.delCategory(_id);

  }
  updateCat() {

    this.shiftCategoryNames = [...this.shiftCategoryNames];

  }




  ngOnInit() {

    this.shiftplanService.categoryNames.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftCategoryNames = newValue;
      this.updateCat();
      
    });

    this.shiftplanService.categories.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftCategorie = newValue;

    });
   // this.shiftplanService.updateCategorieNames();

    
    this.shiftplanService.updateCategories();

  }

}
