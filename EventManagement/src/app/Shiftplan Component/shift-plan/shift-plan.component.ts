import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

export const shiftCategorys = ['Bar', 'SiBeKo', 'Bühne1'];

@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss']
})


export class ShiftPlanComponent {
  public shiftCategorys = ['Bar', 'SiBeKo', 'Bühne1'];
  value = 'Bar2';
  constructor(private cdRef: ChangeDetectorRef) {
    this.updateCat();
  }
  addCat(): void {
    shiftCategorys.push(this.value);
    this.updateCat();
  }
  updateCat() {

    this.shiftCategorys = [...shiftCategorys];

  }




}
