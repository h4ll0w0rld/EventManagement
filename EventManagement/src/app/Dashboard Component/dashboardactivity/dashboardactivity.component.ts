import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/user';

@Component({
  selector: 'app-dashboardactivity',
  templateUrl: './dashboardactivity.component.html',
  styleUrls: ['./dashboardactivity.component.scss'],
})
export class DashboardactivityComponent {
  @Input() start: string | null = '';
  @Input() end: string | null = '';
  @Input() date: string | null = '';
  @Input() role: string = "";
  @Input() description: string = "";
  @Input() activity: any[] = [];

  actiyities: Activity[] = [];
  showHelpers: boolean = false;
  test() {
    
    console.log(this.activity[0].user, "are the helpers populated ?")
    console.log(this.activity, "full activity object")
  }
  toggleHelpers() {
    this.showHelpers = !this.showHelpers;
  }


  usersInShift() {
    
  
}
}


