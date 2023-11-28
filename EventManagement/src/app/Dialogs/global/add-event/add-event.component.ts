import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { min } from 'rxjs';
import { EventModel } from 'src/app/Object Models/EventModel';
import { EventhubService } from 'src/app/Services/Eventhub Service/eventhub.service';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {

  newEvent: EventModel = new EventModel(-1, "", "", new Date(), new Date(), "")

  startTime: string = "18:00"
  endTime: string = "23:00"
  constructor( public hubservice: EventhubService, private dialogRef: MatDialogRef<AddEventComponent>){
  }

  onSubmit() {


    let [hours, minutes] = this.startTime.split(':').map(Number);
    let date: Date = new Date(this.newEvent.endDate);
    date.setHours(hours, minutes, 0);

    this.newEvent.endDate = date;

    [hours, minutes] = this.endTime.split(':').map(Number);
    date = new Date(this.newEvent.startDate);
    date.setHours(hours, minutes, 0);

    this.newEvent.startDate = date
    this.hubservice.addEvent(this.newEvent)
    
    this.dialogRef.close();


  }

  // private updateEndDate() {

  //   const start = this.newEvent.startTime;
  //   const time = this.newEvent.numberOfShifts * this.currentBlock.intervall;
  //   const endDate = new Date(start.getTime() + time * 60000);
  //   this.currentBlock.endTime = endDate;
  // }
  onInputChange(isStart: boolean) {

    if (isStart) {
      console.log("Start time: ", this.startTime)
      const [hours, minutes] = this.startTime.split(':').map(Number);
      console.log("start date: ", this.newEvent.startDate)
      const date = new Date(this.newEvent.startDate);
      date.setHours(hours);
      date.setMinutes(minutes);
      console.log("start date final: ", this.newEvent.startDate)
      this.newEvent.startDate = date;
    } else {


    }


  }


}
