import { Time } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-shift-cat-form',
  templateUrl: './add-cat-dialog.component.html',
  styleUrls: ['./add-cat-dialog.component.scss']
})
export class AddCatDialogComponent {

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







/* import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-add-cat-dialog',
  templateUrl: './add-cat-dialog.component.html',
  providers: [DatePipe],
  styleUrls: ['./add-cat-dialog.component.scss']
})

export class AddCatDialogComponent {

  shiftCategoryNames = ["Bar1", "Bar2", "Bar3"];
  categoryName: string = '';
  description: string = '';
  interval: number = 60;
  numberOfActivities: number = 2;
  startTime = "00:00";
  endTime = "23:00";
  chosenDate: Date = new Date();
  constructor(public shiftplanService: ShiftplanService, private datePipe: DatePipe){
    
  }

  addCat(): void {

    const date = this.datePipe.transform(this.chosenDate, "yyyy-MM-dd");
    if(this.checkUserInput()){
      console.log(this.endTime)

      this.shiftplanService.addCategory(this.categoryName, this.description, this.interval, this.numberOfActivities, this.startTime, this.endTime, date)
      this.shiftplanService.updateCategories();
    
      this.updateCat();
    }else{
      console.log("Uncomplete Input")
    }
  }
  updateCat() {

    this.shiftCategoryNames = [...this.shiftCategoryNames];

  }
  

  getErrorMessage():boolean {
    if (!this.categoryName) {
      return true;
    }

    return false
  }

  checkUserInput(): boolean{
    if(!this.categoryName) return false;
    if(this.endTime === "00:00") this.endTime = "24:00";
    if(this.convertTimeToMinutes(this.startTime) > this.convertTimeToMinutes(this.endTime)) return false;
    return true;

  }
  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }

} */
