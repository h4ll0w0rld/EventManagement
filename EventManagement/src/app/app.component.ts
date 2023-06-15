import { Component } from '@angular/core';
import { ShiftplanService } from './Services/Shiftplan Service/shiftplan.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventManagement';
  unlocked: boolean = false;

  activityText = [
      'Test Activity 1',
      'Test Activity 2',
      'Test Activity 3'
  ];


  constructor(public shiftplanService: ShiftplanService) {} 


  ngOnInit() {

    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })
  }
}
