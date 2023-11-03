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

  constructor(public shiftplanService: ShiftplanService,) {
    this.currentBlock.startTime = this.eventStartDate;
    this.updateEndDate();
  }

  private updateEndDate() {
    
    const start = this.currentBlock.startTime;
    const time = this.currentBlock.numberOfShifts * this.currentBlock.intervall;
    const endDate = new Date(start.getTime() + time *60000);
    this.currentBlock.endTime = endDate;
  }

  
  onInputChange() {
    this.updateEndDate();
  }


  

  //shiftIntervall = 120;
  //persProShift = 3;

  //startTime = new Date();
  //endTime = new Date();

  shiftAmount = 1;

  //shiftBlocks = [[], [], []]; 


  newBlock() {
    
    this.newCategory.shiftBlocks.push(this.currentBlock);

  }

  addCat() {

    console.log(this.newCategory.shiftBlocks[0].startTime);
    this.shiftplanService.addCategory(this.newCategory.name, this.newCategory.description, this.newCategory.eventId, this.newCategory.shiftBlocks);
  }


  /* newCurrentBlock() {

    if (!this.currentBlock) {
      
      this.currentBlock = true;
      this.startTime = this.eventStartDate;
      this.endTime = new Date(this.startTime.getTime() + (this.shiftAmount * (this.shiftIntervall * 1000)));
      
    } else {

      this.shiftBlocks.push();
    }
  } */
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
