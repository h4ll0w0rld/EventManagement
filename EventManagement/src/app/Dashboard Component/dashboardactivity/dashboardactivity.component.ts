import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboardactivity',
  templateUrl: './dashboardactivity.component.html',
  styleUrls: ['./dashboardactivity.component.scss']
})
export class DashboardactivityComponent {
  @Input() intervall: number = 0;
}
