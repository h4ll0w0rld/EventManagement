import { Time } from '@angular/common';
import { Component } from '@angular/core';
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
    shiftBlocks: [

    ],
  }

  eventStartDate = new Date('2023-08-10 13:00');
  eventEndDate = new Date('2023-08-13 12:00');

  currentBlock: any = {
    intervall: 60,
    activitiesPerShift: 3,
    numberOfShifts: 1,
    startTime: this.eventStartDate,
    endTime: new Date(),

  }

  minZeit: string;
  startTimeTime: string;

  constructor(public shiftplanService: ShiftplanService,) {
    this.currentBlock.startTime = this.eventStartDate;
    this.minZeit = this.currentBlock.startTime.getHours() + ':' + this.currentBlock.startTime.getMinutes();

    this.startTimeTime = this.currentBlock.startTime.getHours() + ':' + this.currentBlock.startTime.getMinutes();
    console.log(this.minZeit);
    this.updateEndDate();
  }

  private updateEndDate() {

    const start = this.currentBlock.startTime;
    const time = this.currentBlock.numberOfShifts * this.currentBlock.intervall;
    const endDate = new Date(start.getTime() + time * 60000);
    this.currentBlock.endTime = endDate;
  }


  onInputChange() {
    console.log("test: " + this.minZeit);
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

    const newBlock = {...this.currentBlock};
    this.newCategory.shiftBlocks.push(newBlock);
    this.updateCurrentBlock(newBlock);

  }

  addCat() {

    this.shiftplanService.addCategory(this.newCategory.name, this.newCategory.description, this.newCategory.eventId, this.newCategory.shiftBlocks);
  }


  getTimeFormat(_date: string) {

    const date = new Date(_date);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes} Uhr`;

    return time;

  }

  updateCurrentBlock(_lastBlock: any) {

    this.currentBlock.startTime = _lastBlock.endTime;
    this.minZeit = _lastBlock.endTime.getHours() + ':' + _lastBlock.endTime.getMinutes();
    this.startTimeTime = _lastBlock.endTime.getHours() + ':' + _lastBlock.endTime.getMinutes();
    this.updateEndDate();

  }

}

