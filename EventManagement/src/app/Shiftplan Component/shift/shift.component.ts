import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {

  @Input() intervall: number = 2;

  startTimes: Date[] = [new Date(2023, 10, 9, 0), new Date(2023, 10, 9, 3), new Date(2023, 10, 9, 6)]
  startTime: string = this.startTimes[0].toLocaleTimeString();
  startHandM: string = this.startTime.substring(0, this.startTime.lastIndexOf(':'));

  endHandM: string = '02:00';

  activities: number = 2;
  
  calculateEndTime() {

    /* this.startTimeOnly = this.startTimes.toLocaleTimeString();
    const endTime = new Date(this.startTime);
    endTime.setHours(endTime.getHours() + this.intervall);
    this.endTimeOnly = endTime.toLocaleTimeString(); */

  }
  
}
