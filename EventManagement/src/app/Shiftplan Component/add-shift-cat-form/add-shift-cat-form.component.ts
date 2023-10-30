import { Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-shift-cat-form',
  templateUrl: './add-shift-cat-form.component.html',
  styleUrls: ['./add-shift-cat-form.component.scss']
})
export class AddShiftCatFormComponent {

  categoryName = "";
  description = "";

  shiftIntervall = 120;
  persProShift = 3;


  currentBlock = false;

  eventStartDate = new Date('2023-09-08');

  startTime = new Date();
  endTime = new Date();

  shiftAmount = 1;

  shiftBlocks = [[], [], []];




  newCurrentBlock() {

    if (!this.currentBlock) {
      
      this.currentBlock = true;
      this.startTime = this.eventStartDate;
      this.endTime = new Date(this.startTime.getTime() + (this.shiftAmount * (this.shiftIntervall * 1000)));
      
    } else {

      this.shiftBlocks.push();
    }
  }
}
