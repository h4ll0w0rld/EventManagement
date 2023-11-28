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

  //eventStartDate = new Date('2023-08-10 13:00');
  //eventEndDate = new Date('2024-01-01 12:00');

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
  maxZeit = '23:59';

  //maxDateError = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<UserListComponent>, public eventService: EventServiceService) {

    if (data.catContent.shifts.some((obj: any) => obj)) {

      const shifts = data.catContent.shifts;
      this.minDate = new Date(shifts[shifts.length - 1].endTime)
      console.log(this.minDate)

      this.currentBlock.startTime = this.minDate

    } else {

      this.currentBlock.startTime = new Date(eventService.currentEvent.startDate);
      console.log("Hier kanns knalln:", eventService.currentEvent.startDate)
      this.minDate = this.currentBlock.startTime;

    }

    this.maxDate = new Date(this.eventService.currentEvent.endDate);
    this.minZeit = this.minDate.getHours() + ':' + this.minDate.getMinutes();
    this.startTimeTime = this.minDate.getHours() + ':' + this.minDate.getMinutes();

    this.updateEndDate();
  }


  private updateEndDate() {

    // const start = this.currentBlock.startTime;
    // console.log("start: " + start);
    const time = this.currentBlock.numberOfShifts * this.currentBlock.intervall;
    console.log(this.currentBlock.startTime, "eeeeeeeeeeeeeeeeeeeeeeeee");
    const endDate = new Date(this.currentBlock.startTime.getTime() + (time * 60000));
    console.log(endDate);

    this.currentBlock.endTime = endDate;
    //this.maxDateError = false;

    console.log("ende: " + this.currentBlock.endTime);
    console.log("Event Ende: " + this.formattedEventEndDate());

    if (this.currentBlock.endTime > this.eventService.currentEvent.endDate) {
      console.log("Geeeeeht doch!");
    }
  }


  onInputChange() {

    const eventEndDate = new Date(this.eventService.currentEvent.endDate);

    if (this.currentBlock.startTime.getDate() != this.minDate.getDate()) {

      this.minZeit = '00:00';
      this.maxZeit = '23:59';

      if (this.currentBlock.startTime.getDate() === eventEndDate.getDate()) {

        const eventEndTime = eventEndDate.getHours() + ":" + eventEndDate.getMinutes();

        this.maxZeit = eventEndTime;

        if (this.startTimeTime > eventEndTime) {

          this.startTimeTime = eventEndTime;
        }
      }

    } else {

      /////////////////////////////////// TO DO

      this.maxZeit = '23:59';
      this.minZeit = this.minDate.getHours() + ':' + this.minDate.getMinutes();
      const startDate = new Date(eventEndDate);
      const [hours, minutes] = this.startTimeTime.split(':').map(Number);
      startDate.setHours(hours);
      startDate.setMinutes(minutes);
      console.log("bin NICHT drinnnneeeeeeeeeeeeeeeeeeeeee", startDate, eventEndDate);

      if (startDate > eventEndDate) {
        console.log("bin drinnnneeeeeeeeeeeeeeeeeeeeee", startDate.getTime(), eventEndDate.getTime());
        this.startTimeTime = this.minDate.getHours() + ':' + this.minDate.getMinutes();
      }
    }

    ///////////////////////////////////// TO DO


    const [hours, minutes] = this.startTimeTime.split(':').map(Number);
    const currDate = new Date(this.currentBlock.startTime);
    currDate.setHours(hours, minutes);
    this.currentBlock.startTime = currDate;

    this.updateEndDate();
  }

  onTimeInputChange() {

    const [hours, minutes] = this.startTimeTime.split(':').map(Number);
    const date = new Date(this.currentBlock.startTime);
    console.log(date);
    date.setHours(hours);
    date.setMinutes(minutes);
    //this.currentBlock.startTime.setHours(hours);
    //this.currentBlock.startTime.setMinutes(minutes);
    console.log(date);
    this.currentBlock.startTime = date;
    console.log(this.currentBlock.startTime);
    this.onInputChange();
  }

  newBlock() {

    if (this.currentBlock.endTime <= this.formattedEventEndDate()) {

    const newBlock = { ...this.currentBlock };
    console.log(newBlock.startTime);
    newBlock.startTime = this.formatDate(newBlock.startTime);
    newBlock.endTime = this.formatDate(newBlock.endTime);

    console.log(newBlock);

    this.eventService.addShiftBlockToCategory(newBlock, this.data.catContent.id);

    this.eventService.updateCategories();
    this.matDialogRef.close();
    }

    

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

  formattedEventEndDate() {

    return new Date(this.eventService.currentEvent.endDate);
  }

}
