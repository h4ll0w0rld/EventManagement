import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventManagement';

  activityText = [
      'Test Activity 1',
      'Test Activity 2',
      'Test Activity 3'
  ];
}
