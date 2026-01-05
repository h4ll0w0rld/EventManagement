import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListComponent } from '../user-list-dialog/user-list.component';
import { EventService } from 'src/app/core/features/events/event.service';
import { EventModel } from 'src/app/Object Models/EventModel';
import { of, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-shiftblock',
  templateUrl: './add-shiftblock.component.html',
  styleUrls: ['./add-shiftblock.component.scss'],
})
export class AddShiftblockComponent {

  newCategory: any = {
    name: "",
    description: "",
    eventId: 1,
    shiftBlocks: [],
  }

  currentBlock: any = {
    intervall: 60,
    activitiesPerShift: 3,
    numberOfShifts: 1,
    startTime: new Date(),
    endTime: new Date(),

  }

  minDate: Date = new Date();
  minZeit: string = "";
  startTimeTime: string = "";

  maxDate = new Date();
  maxZeit = '23:59';


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<UserListComponent>, public eventService: EventService) {
    if (this.eventService.currentEvent)
      if (this.eventService.currentEvent.id != -1) {
        if (data.catContent.shifts.some((obj: any) => obj)) {

          const shifts = data.catContent.shifts;
          this.minDate = new Date(shifts[shifts.length - 1].endTime)
          this.currentBlock.startTime = this.minDate

        } else {

          this.currentBlock.startTime = new Date(this.eventService.currentEvent.startDate);
          this.minDate = this.currentBlock.startTime;

          this.minDate = this.currentBlock.startTime;

        }

        this.maxDate = new Date(this.eventService.currentEvent.endDate);
        this.minZeit = this.minDate.getHours() + ':' + this.minDate.getMinutes();
        this.startTimeTime = this.minDate.getHours() + ':' + this.minDate.getMinutes();
      }

    this.updateEndDate();
  }

  private updateEndDate() {

    const time = this.currentBlock.numberOfShifts * this.currentBlock.intervall;
    const endDate = new Date(this.currentBlock.startTime.getTime() + (time * 60000));

    this.currentBlock.endTime = endDate;
  }

  onInputChange() {

    if (this.eventService.currentEvent)
      if (this.eventService.currentEvent.id != -1) {

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

          this.maxZeit = '23:59';
          this.minZeit = this.minDate.getHours() + ':' + this.minDate.getMinutes();

          if (this.startTimeTime < this.minZeit) {
            this.startTimeTime = this.minZeit;
          }
        }

        const currDate = new Date(this.currentBlock.startTime);
        console.log("nach set:", currDate)
        this.currentBlock.startTime = currDate;
        console.log(currDate)
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
    console.log("Adding new block:", this.currentBlock);
    if (this.eventService.currentEvent)
      console.log("Event end date:", this.eventService.currentEvent.endDate);
      if (this.currentBlock.endTime <=  this.formattedEventEndDate()) {
        console.log("Within event date, adding block.");
        const newBlock = { ...this.currentBlock };
        newBlock.startTime = this.formatDate(newBlock.startTime);
        newBlock.endTime = this.formatDate(newBlock.endTime);

        this.eventService.addShiftBlockToCategory(newBlock, this.data.catContent.id).subscribe((res) => {
          console.log("Shift block added successfully.", res);
          this.eventService.triggerCategoryReload();
        });
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

    return `${sYear}-${sMonth}-${sDay} ${sHours}:${sMinutes}`;
  }

  formattedEventEndDate() {

    if (this.eventService.currentEvent)
      return new Date(this.eventService.currentEvent.endDate)
    return console.error();
    
  }

  outOfEventDate() {

    let outOf = false;
    if (this.eventService.currentEvent) {
      const formattedDate = new Date(this.currentBlock.endTime)
      const eventEndDate = new Date(this.eventService.currentEvent.endDate)

      if (formattedDate > eventEndDate) {

        outOf = true;
      }
    }
    return outOf;
  }

}
