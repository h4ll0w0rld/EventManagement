import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/features/events/event.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-shiftblock',
  templateUrl: './add-shiftblock.component.html',
  styleUrls: ['./add-shiftblock.component.scss']
})
export class AddShiftblockComponent {

  block = {
    startTime: new Date(),
    intervall: 60,
    numberOfShifts: 1,
    activitiesPerShift: 3,
    endTime: new Date()
  };

  startTime = '';

  constructor(
    public eventService: EventService,
    private dialogRef: MatDialogRef<AddShiftblockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.init();
  }

  init() {
    const event = this.eventService.currentEvent;
    if (!event) return;

    this.block.startTime = new Date(event.startDate);
    this.startTime = this.formatTime(this.block.startTime);
    this.recalculate();
  }

  updateTime() {
    const [h, m] = this.startTime.split(':').map(Number);
    this.block.startTime.setHours(h, m);
    this.recalculate();
  }

  recalculate() {
    const duration =
      this.block.intervall * this.block.numberOfShifts;

    this.block.endTime = new Date(
      this.block.startTime.getTime() + duration * 60000
    );
  }

  outOfEventDate(): boolean {
    if(this.eventService.currentEvent){
    const eventEnd = new Date(this.eventService.currentEvent.endDate);
    return this.block.endTime > eventEnd;
    }return false
  }

  save() {
    if (this.outOfEventDate()) return;

    this.eventService
      .addShiftBlockToCategory(
        this.formatBlock(),
        this.data.catContent.id
      )
      .subscribe(() => {
        this.eventService.triggerCategoryReload();
        this.dialogRef.close();
      });
  }

  formatBlock() {
    return {
      ...this.block,
      startTime: this.formatDate(this.block.startTime),
      endTime: this.formatDate(this.block.endTime)
    };
  }

  formatTime(d: Date) {
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  formatDate(d: Date) {
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${this.formatTime(d)}`;
  }
}
