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

  shiftCategoryNames = ["Bar1", "Bar2", "Bar3"];
  value = 'Bar2';
  shiftCategorie:CategoryContent[] = [];
  constructor(public shiftplanService: ShiftplanService) {
 
  }

  addCat(): void {

    this.shiftplanService.addCategory(this.value, "Wichtige Sachen ;)")
    this.shiftCategorie.push(new CategoryContent(111,this.value, []))
    this.shiftplanService.categories.next(this.shiftCategorie);
    this.shiftplanService.updateCategories();
  
    this.updateCat();
  }
  delCategory(){
   // this.shiftplanService.delCategory(3);



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
    this.shiftplanService.updateCategorieNames();

    
    this.shiftplanService.updateCategories();

  }

}
