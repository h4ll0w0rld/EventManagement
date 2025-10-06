import { Component, Input } from '@angular/core';

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

  @Input() helpers: any[] = [];

  showHelpers: boolean = false;

  toggleHelpers() {
    this.showHelpers = !this.showHelpers;
  }
}
