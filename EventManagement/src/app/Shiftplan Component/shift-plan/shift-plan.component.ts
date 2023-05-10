import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';


@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss']
})


export class ShiftPlanComponent {

  //public shiftCategories = ['Bar', 'SiBeKo', 'Bühne1'];
  shiftCategoryNames = ["", "", ""];
  value = 'Bar2';

  constructor(private cdRef: ChangeDetectorRef, public shiftplanService: ShiftplanService) {

    this.shiftCategoryNames = shiftplanService.categoryNames;
    this.updateCat();
  }
  addCat(): void {
    this.shiftCategoryNames.push(this.value);
    this.updateCat();
  }
  updateCat() {

    this.shiftCategoryNames = [...this.shiftCategoryNames];

  }




}
