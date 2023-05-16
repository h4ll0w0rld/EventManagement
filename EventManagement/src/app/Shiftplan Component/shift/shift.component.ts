import { Component, Input } from '@angular/core';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';



@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {

  @Input() intervall: number = 0;
  @Input() shift: Shift = new Shift(0,0,[]);
  

  toggled = false;


}

