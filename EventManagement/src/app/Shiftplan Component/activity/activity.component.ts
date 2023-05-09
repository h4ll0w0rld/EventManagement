import { Component, Input } from '@angular/core';
import { Activity } from '../shift/shift.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  @Input() activity = new Activity("test","");
  
  constructor() {

    console.log(this.activity.vName);
  }

}
