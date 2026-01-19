import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/features/events/event.service';

@Component({
  selector: 'app-add-shiftblock',
  templateUrl: './add-shiftblock.component.html',
  styleUrls: ['./add-shiftblock.component.scss'],
})
export class AddShiftblockComponent {

  currentBlock: any = {
    intervall: 60,
    activitiesPerShift: 3,
    numberOfShifts: 1,
    startTime: new Date(),
    endTime: new Date(),
  };

  minDate: Date = new Date();
  maxDate: Date = new Date();

  minZeit = '';
  maxZeit = '23:59';
  startTimeTime = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddShiftblockComponent>,
    public eventService: EventService
  ) {
    
    if (this.eventService.currentEvent?.id !== -1 && this.eventService.currentEvent) {

      // 🔁 SAME LOGIC AS OLD CODE
      if (data?.catContent?.shifts?.some((s: any) => s)) {
        const shifts = data.catContent.shifts;
        const lastShiftEnd = new Date(shifts[shifts.length - 1].endTime);

        this.minDate = lastShiftEnd;
        this.currentBlock.startTime = lastShiftEnd;
      } else {
        this.currentBlock.startTime = new Date(this.eventService.currentEvent.startDate);
        this.minDate = this.currentBlock.startTime;
      }

      this.maxDate = new Date(this.eventService.currentEvent.endDate);

      this.minZeit =
        this.minDate.getHours() + ':' + this.minDate.getMinutes();
      this.startTimeTime = this.minZeit;
    }

    this.updateEndDate();
  }

  // 🔁 SAME MECHANIC
  private updateEndDate() {
    const time = this.currentBlock.numberOfShifts * this.currentBlock.intervall;
    this.currentBlock.endTime = new Date(
      this.currentBlock.startTime.getTime() + time * 60000
    );
  }

  // 🔁 SAME INPUT LOGIC
  onInputChange() {
    if (this.eventService.currentEvent?.id !== -1 && this.eventService.currentEvent) {
      const eventEndDate = new Date(this.eventService.currentEvent.endDate);

      if (this.currentBlock.startTime.getDate() !== this.minDate.getDate()) {
        this.minZeit = '00:00';
        this.maxZeit = '23:59';

        if (this.currentBlock.startTime.getDate() === eventEndDate.getDate()) {
          const eventEndTime =
            eventEndDate.getHours() + ':' + eventEndDate.getMinutes();
          this.maxZeit = eventEndTime;

          if (this.startTimeTime > eventEndTime) {
            this.startTimeTime = eventEndTime;
          }
        }
      } else {
        this.maxZeit = '23:59';
        this.minZeit =
          this.minDate.getHours() + ':' + this.minDate.getMinutes();

        if (this.startTimeTime < this.minZeit) {
          this.startTimeTime = this.minZeit;
        }
      }

      // normalize date object
      this.currentBlock.startTime = new Date(this.currentBlock.startTime);
    }

    this.updateEndDate();
  }

  // 🔁 SAME TIME HANDLING
  onTimeInputChange() {
    const [hours, minutes] = this.startTimeTime.split(':').map(Number);
    const date = new Date(this.currentBlock.startTime);

    date.setHours(hours);
    date.setMinutes(minutes);

    this.currentBlock.startTime = date;
    this.onInputChange();
  }

  // 🔁 SAME SUBMIT LOGIC
  newBlock() {
    if (this.outOfEventDate()) return;

    const newBlock = { ...this.currentBlock };

    newBlock.startTime = this.formatDate(newBlock.startTime);
    newBlock.endTime = this.formatDate(newBlock.endTime);

    this.eventService
      .addShiftBlockToCategory(newBlock, this.data.catContent.id)
      .subscribe(() => {
        this.eventService.triggerCategoryReload();
        this.dialogRef.close();
      });
  }

  // 🔁 SAME FORMATTER AS OLD CODE
  formatDate(date: Date): string {
    const sYear = date.getFullYear();
    const sMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const sDay = date.getDate().toString().padStart(2, '0');
    const sHours = date.getHours().toString().padStart(2, '0');
    const sMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${sYear}-${sMonth}-${sDay} ${sHours}:${sMinutes}`;
  }

  formattedEventEndDate(): Date | undefined {
    if (this.eventService.currentEvent) {
      return new Date(this.eventService.currentEvent.endDate);
    }
    return undefined;
  }

  outOfEventDate(): boolean {
    if (!this.eventService.currentEvent) return false;

    const eventEndDate = new Date(this.eventService.currentEvent.endDate);
    return this.currentBlock.endTime > eventEndDate;
  }
}
