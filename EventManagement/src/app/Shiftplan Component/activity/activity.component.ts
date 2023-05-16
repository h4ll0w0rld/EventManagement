import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/shiftplanModel';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  @Input() activity = new Activity(1, new User(1,"server","dc"), true);
  
  constructor() {

   
  }

}
