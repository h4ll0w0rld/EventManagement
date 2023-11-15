import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { UserListComponent } from '../user-list-dialog/user-list.component';

@Component({
  selector: 'app-add-shiftblock',
  templateUrl: './add-shiftblock.component.html',
  styleUrls: ['./add-shiftblock.component.scss']
})
export class AddShiftblockComponent {

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
    numberOfShifts: 1,
    startTime: this.eventStartDate,
    endTime: this.eventEndDate

  }

  minDate: Date;
  minZeit: string;
  startTimeTime: string;


  constructor(public shiftplanService: ShiftplanService, @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<UserListComponent>) {

    if (data.catContent.shifts.some((obj: any) => obj)) {

      const shifts = data.catContent.shifts;
      this.minDate = new Date(shifts[shifts.length - 1].endTime)
      console.log(this.minDate)

      this.currentBlock.startTime = this.minDate

    } else {

      this.currentBlock.startTime = this.eventStartDate;
      this.minDate = this.currentBlock.startTime;

    }

    this.minZeit = this.minDate.getHours() + ':' + this.minDate.getMinutes();
    this.startTimeTime = this.minDate.getHours() + ':' + this.minDate.getMinutes();

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

    this.shiftplanService.addShiftBlockToCategory(newBlock, this.data.catContent.id);

    this.shiftplanService.updateCategories();
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
