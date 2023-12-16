import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shift-personal-activity',
  templateUrl: './shift-personal-activity.component.html',
  styleUrls: ['./shift-personal-activity.component.scss']
})
export class ShiftPersonalActivityComponent {

  @Input() _shiftsByUser: any;
}
