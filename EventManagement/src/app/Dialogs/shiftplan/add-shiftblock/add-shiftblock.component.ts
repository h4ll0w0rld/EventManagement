import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { UserListComponent } from '../user-list-dialog/user-list.component';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-add-shiftblock',
  templateUrl: './add-shiftblock.component.html',
  styleUrls: ['./add-shiftblock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddShiftblockComponent {

  newCategory: any = {
    name: "",
    description: "",
    eventId: 1,
    shiftBlocks: [],
  }

  eventStartDate = new Date('2023-08-10 13:00');
  eventEndDate = new Date('2024-01-01 12:00');

  currentBlock: any = {
    intervall: 60,
    activitiesPerShift: 3,
    numberOfShifts: 1,
    startTime: new Date(),
    endTime: new Date(),

  }

  minDate: Date;
  minZeit: string;
  startTimeTime: string;

  maxDate = new Date();


  constructor(public shiftplanService: ShiftplanService, @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<UserListComponent>, public eventService: EventServiceService) {

    if (data.catContent.shifts.some((obj: any) => obj)) {

      const shifts = data.catContent.shifts;
      this.minDate = new Date(shifts[shifts.length - 1].endTime)
      console.log(this.minDate)

      this.currentBlock.startTime = this.minDate

    } else {

      this.currentBlock.startTime = new Date(shiftplanService.event.startDate);
      this.minDate = this.currentBlock.startTime;

    }
    
    this.maxDate = new Date(this.shiftplanService.event.endDate);
    this.minZeit = this.minDate.getHours() + ':' + this.minDate.getMinutes();
    this.startTimeTime = this.minDate.getHours() + ':' + this.minDate.getMinutes();



    console.log(this.minDate);


    //console.log(this.minZeit);
    this.updateEndDate();
  }


  private updateEndDate() {

    const start = this.currentBlock.startTime;
    const time = this.currentBlock.numberOfShifts * this.currentBlock.intervall;
    const endDate = new Date(start.getTime() + time * 60000);
    this.currentBlock.endTime = endDate;
  }


  onInputChange() {

    if (this.currentBlock.startTime.getDate() != this.minDate.getDate()) {

      this.minZeit = "00:00";

    } else {

      this.minZeit = this.minDate.getHours() + ':' + this.minDate.getMinutes();
      this.startTimeTime = this.minDate.getHours() + ':' + this.minDate.getMinutes();
    }
    this.updateEndDate();
  }



  onTimeInputChange() {

    const [hours, minutes] = this.startTimeTime.split(':').map(Number);
    const date = new Date(this.currentBlock.startTime);
    date.setHours(hours);
    date.setMinutes(minutes);
    this.currentBlock.startTime = date;
    this.onInputChange();
  }

  newBlock() {

    const newBlock = { ...this.currentBlock };
    console.log(newBlock.startTime);
    newBlock.startTime = this.formatDate(newBlock.startTime);
    newBlock.endTime = this.formatDate(newBlock.endTime);

    console.log(newBlock);

    this.eventService.addShiftBlockToCategory(newBlock, this.data.catContent.id);

    this.eventService.updateCategories();
    this.matDialogRef.close();

  }

  updateCurrentBlock(_lastBlock: any) {

    this.currentBlock.startTime = _lastBlock.endTime;
    this.minZeit = _lastBlock.endTime.getHours() + ':' + _lastBlock.endTime.getMinutes();
    this.startTimeTime = _lastBlock.endTime.getHours() + ':' + _lastBlock.endTime.getMinutes();
    this.updateEndDate();

  }

  formatDate(_date: Date) {

    const sYear = _date.getFullYear();
    const sMonth = (_date.getMonth() + 1).toString().padStart(2, '0');
    const sDay = _date.getDate().toString().padStart(2, '0');
    const sHours = _date.getHours().toString().padStart(2, '0');

    const sMinutes = _date.getMinutes().toString().padStart(2, '0');
    console.log(`${sYear}-${sMonth}-${sDay} ${sHours}:${sMinutes}`);
    return `${sYear}-${sMonth}-${sDay} ${sHours}:${sMinutes}`;
  }

}
