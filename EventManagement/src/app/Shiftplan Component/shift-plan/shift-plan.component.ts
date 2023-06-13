import { Component, ViewEncapsulation } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { DelCatDialogComponent } from 'src/app/del-cat-dialog/del-cat-dialog.component';

import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';


@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})


export class ShiftPlanComponent {


  shiftCategoryNames = ["Bar1", "Bar2", "Bar3"];
  value = 'Bar2';
  shiftCategorie:CategoryContent[] = [];

  categoryName: string = '';
  description: string = '';
  interval: number = 60;
  numberOfActivities: number = 2;
  startTime = "00:00";
  endTime = "23:00";
  chosenDate: Date = new Date();

  doubleTouchCount = 0;

  selectedIndex: number = 1;
  private tabsCount:number = this.shiftCategorie.length - 1;
  SWIPE_ACTION = { LEFT: 'panleft', RIGHT: 'panright' };
  

  constructor(public shiftplanService: ShiftplanService, private datePipe: DatePipe, private dialog: MatDialog) {
 
    
  }
  selectChange(): void{
    console.log("Selected INDEX: " + this.selectedIndex);
    //this.selectedIndex += 1
  }


  swipeLeft(event:any){
   
      if(event.isFinal) {
        
      
      const isLast = this.selectedIndex === this.shiftCategorie.length;
      this.selectedIndex = isLast ? this.selectedIndex : this.selectedIndex + 1;
     
    }
    
     
  }

  swipeRight(event:any){

    if(event.isFinal) { 
    
      if(this.selectedIndex > 0){
        this.selectedIndex -= 1;
        console.log("swiped right !", this.selectedIndex)
      }
    
    }

  }


  addCat(): void {
    
    const date = this.datePipe.transform(this.chosenDate, "yyyy-MM-dd");
    this.shiftplanService.addCategory(this.categoryName, this.description, this.interval, this.numberOfActivities,this.startTime, this.endTime, date)
    this.shiftplanService.updateCategories();
    
    this.updateCat();
  }

  delCatDialog(_cat: CategoryContent) {

    
    let delMessage = "Möchtest du " + _cat.name + " wirklich löschen?";
    console.log(_cat.name);
    let dialogRef = this.dialog.open(DelCatDialogComponent,
      {
        data: {
          message: delMessage,
          catId: _cat.id    
          },
        width: '95vh',
        height: 'auto',
      }

    );
  }

  updateCat() {

    this.shiftCategoryNames = [...this.shiftCategoryNames];

  }




  ngOnInit() {

    this.shiftplanService.categoryNames.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftCategoryNames = newValue;
      this.updateCat();
      
    });

    this.shiftplanService.categories.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftCategorie = newValue;

    });
   // this.shiftplanService.updateCategorieNames();

    
  this.shiftplanService.updateCategories();

  const element = document.getElementById("md-content");
  
  if (element instanceof HTMLElement) {
    console.log("hi am a member")
    const hammer = new Hammer(element);
    hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.on('panleft panright', (event) => {
     console.log("yeeees")
      if (event.direction === Hammer.DIRECTION_LEFT) {
        console.log("event left")
        this.swipeLeft(event);
        
      } else if (event.direction === Hammer.DIRECTION_RIGHT) {
        this.swipeRight(event)
        console.log("event right")
      }
      return false
    });
    
  }
  
 
  }

  dropTab(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.shiftCategorie, 
      event.previousIndex, 
      event.currentIndex
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DelCatDialogComponent, {

    });
  }

  // touchStart() {
  //   console.log("test start");
  //   this.openDialog();

  // }

  touchEnd() {
    console.log("test end");

  }

}
