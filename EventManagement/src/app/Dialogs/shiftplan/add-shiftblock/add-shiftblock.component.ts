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
  minZeit = '00:00';
  maxZeit = '23:59';
  startTimeTime = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddShiftblockComponent>,
    private eventService: EventService
  ) {
    if (this.eventService.currentEvent) {
      this.minDate = new Date(this.eventService.currentEvent.startDate);
      this.maxDate = new Date(this.eventService.currentEvent.endDate);
      this.currentBlock.startTime = this.minDate;
      this.startTimeTime = this.formatTime(this.minDate);
      this.minZeit = this.startTimeTime;
    }
    this.updateEndDate();
  }

  onInputChange() {
    this.updateEndDate();
  }

  onTimeInputChange() {
    const [h, m] = this.startTimeTime.split(':').map(Number);
    const d = new Date(this.currentBlock.startTime);
    d.setHours(h, m);
    this.currentBlock.startTime = d;
    this.updateEndDate();
  }

  updateEndDate() {
    const minutes =
      this.currentBlock.intervall * this.currentBlock.numberOfShifts;
    this.currentBlock.endTime = new Date(
      this.currentBlock.startTime.getTime() + minutes * 60000
    );
  }

  outOfEventDate(): boolean {
    if (!this.eventService.currentEvent) return false;
    return (
      this.currentBlock.endTime >
      new Date(this.eventService.currentEvent.endDate)
    );
  }

  newBlock() {
  if (this.outOfEventDate()) return;

  const block = {
    ...this.currentBlock,
    startTime: this.formatDateTime(this.currentBlock.startTime),
    endTime: this.formatDateTime(this.currentBlock.endTime),
  };

  this.eventService
    .addShiftBlockToCategory(block, this.data.catContent.id)
    .subscribe(() => {
      this.eventService.triggerCategoryReload();
      this.dialogRef.close();
    });
}

  private formatDate(d: Date): string {
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')} ${d
      .getHours()
      .toString()
      .padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  private formatTime(d: Date): string {
    return `${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }
  private formatDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

}
