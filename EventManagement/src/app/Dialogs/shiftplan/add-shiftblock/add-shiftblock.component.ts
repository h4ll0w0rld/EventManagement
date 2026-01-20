import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/features/events/event.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-shiftblock',
  templateUrl: './add-shiftblock.component.html',
  styleUrls: ['./add-shiftblock.component.scss'],
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ])
  ]
})
export class AddShiftblockComponent {

  step = 0;

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
        this.minDate.getHours().toString().padStart(2, '0') + ':' +
        this.minDate.getMinutes().toString().padStart(2, '0');

      this.startTimeTime = this.minZeit;
    }

    this.updateEndDate();
  }

  /* ---------- NAVIGATION ---------- */

  next() {
    if (this.step < 3) this.step++;
  }

  back() {
    if (this.step > 0) this.step--;
  }

  /* ---------- DATE LOGIC ---------- */

  private updateEndDate() {
    const time = this.currentBlock.numberOfShifts * this.currentBlock.intervall;
    this.currentBlock.endTime = new Date(
      this.currentBlock.startTime.getTime() + time * 60000
    );
  }

  onInputChange() {
    if (this.eventService.currentEvent?.id !== -1 && this.eventService.currentEvent) {
      const eventEndDate = new Date(this.eventService.currentEvent.endDate);

      if (this.currentBlock.startTime.getDate() !== this.minDate.getDate()) {
        this.minZeit = '00:00';
        this.maxZeit = '23:59';

        if (this.currentBlock.startTime.getDate() === eventEndDate.getDate()) {
          const eventEndTime =
            eventEndDate.getHours().toString().padStart(2, '0') + ':' +
            eventEndDate.getMinutes().toString().padStart(2, '0');

          this.maxZeit = eventEndTime;

          if (this.startTimeTime > eventEndTime) {
            this.startTimeTime = eventEndTime;
          }
        }
      } else {
        this.maxZeit = '23:59';
        this.minZeit =
          this.minDate.getHours().toString().padStart(2, '0') + ':' +
          this.minDate.getMinutes().toString().padStart(2, '0');

        if (this.startTimeTime < this.minZeit) {
          this.startTimeTime = this.minZeit;
        }
      }

      this.currentBlock.startTime = new Date(this.currentBlock.startTime);
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

  /* ---------- SUBMIT ---------- */

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

  formatDate(date: Date): string {
    const sYear = date.getFullYear();
    const sMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const sDay = date.getDate().toString().padStart(2, '0');
    const sHours = date.getHours().toString().padStart(2, '0');
    const sMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${sYear}-${sMonth}-${sDay} ${sHours}:${sMinutes}`;
  }

  outOfEventDate(): boolean {
    if (!this.eventService.currentEvent) return false;
    const eventEndDate = new Date(this.eventService.currentEvent.endDate);
    return this.currentBlock.endTime > eventEndDate;
  }
}
