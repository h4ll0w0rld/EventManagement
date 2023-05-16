import { Component } from '@angular/core';

import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';


@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss']
})


export class ShiftPlanComponent {

  shiftCategories: CategoryContent[]  = [
    new CategoryContent(0, "Somthing went wrong", [new Shift(0, 0, []), new Shift(0, 0, []), new Shift(0, 0, []), new Shift(0, 0, [])])

  ];


  shiftCategoryNames = ["Bar1", "Bar2", "Bar3"];
  value = 'Bar2';

  constructor(public shiftplanService: ShiftplanService) {

    
    //this.updateCat();
    
  }
  addCat(): void {
    this.shiftCategoryNames.push(this.value);
    this.updateCat();
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
    this.shiftplanService.updateCategorieNames();

    this.shiftplanService.categories.subscribe((val) => {
      this.shiftCategories = val;
      this.updateCat();

    })
    this.shiftplanService.updateCategories();

  }

}
