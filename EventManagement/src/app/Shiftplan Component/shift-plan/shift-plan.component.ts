import { Component } from '@angular/core';

export const shiftCategorys = ['Bar', 'SiBeKo', 'Bühne1'];

@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss']
})


export class ShiftPlanComponent {
  public shiftCategorys = ['Bar', 'SiBeKo', 'Bühne1'];
}
