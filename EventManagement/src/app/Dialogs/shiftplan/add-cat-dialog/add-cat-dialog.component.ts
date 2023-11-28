import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-add-shift-cat-form',
  templateUrl: './add-cat-dialog.component.html',
  styleUrls: ['./add-cat-dialog.component.scss']
})
export class AddCatDialogComponent {

  newCategory: any = {
    name: "",
    description: "",
    eventId: 1,
    shiftBlocks: [],
  }

  eventStartDate = new Date('2023-08-10 13:00');
  eventEndDate = new Date('2023-08-13 12:00');

  currentBlock: any = {
    intervall: 60,
    activitiesPerShift: 3,
    numberOfShifts: 0,
    startTime: this.eventStartDate,
    //endTime: new Date(),
    endTime: this.eventEndDate

  }

  minZeit: string;
  startTimeTime: string;

  constructor(public dialogRef: MatDialogRef<AddCatDialogComponent>, public eventService: EventServiceService) {

    this.newCategory.eventId = this.eventService.currentEvent.id;
    this.currentBlock.startTime = this.eventStartDate;
    this.minZeit = this.currentBlock.startTime.getHours() + ':' + this.currentBlock.startTime.getMinutes();

    this.startTimeTime = this.currentBlock.startTime.getHours() + ':' + this.currentBlock.startTime.getMinutes();
    console.log(this.minZeit);

    //this.updateEndDate();
  }


  isCatNameInvalid(): boolean {

    return this.newCategory.name.trim() === '';
  }

  addCat() {

    if (this.isCatNameInvalid()) {
      return
    }
    else {
      this.eventService.addCategory(this.newCategory.name, this.newCategory.description, this.newCategory.eventId, this.newCategory.shiftBlocks);
      this.dialogRef.close();
    } 
  }

  getTimeFormat(_date: string) {

    const date = new Date(_date);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes} Uhr`;

    return time;

  }



}

