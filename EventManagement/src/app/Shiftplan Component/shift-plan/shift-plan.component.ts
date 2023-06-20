import { Component, HostListener, Inject, Injectable, ViewEncapsulation } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { DelCatDialogComponent } from 'src/app/Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';

import { DOCUMENT, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { interval } from 'rxjs';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = {
    pan: { enable: true, 
          direction: Hammer.DIRECTION_ALL,
          threshold: 50 },
    

    
  };
 

}

@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss'],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    DatePipe, // Move DatePipe to providers array
  ],
  encapsulation: ViewEncapsulation.None
})



export class ShiftPlanComponent {


  shiftCategoryNames = ["Bar1", "Bar2", "Bar3"];
  value = 'Bar2';
  shiftCategorie: CategoryContent[] = [];
  isAnimationDisabled = false;
  categoryName: string = '';
  description: string = '';
  interval: number = 60;
  numberOfActivities: number = 2;
  startTime = "00:00";
  endTime = "23:00";
  chosenDate: Date = new Date();

  doubleTouchCount = 0;
  unlocked: boolean = false;

  private scrollableElement: any;
  private isPanningDisabled: boolean = true;
  selectedIndex: number = 1;
  private tabsCount: number = this.shiftCategorie.length - 1;
  SWIPE_ACTION = { LEFT: 'panleft', RIGHT: 'panright' };

  
  colorControl = new FormControl('primary' as ThemePalette);

  constructor(public shiftplanService: ShiftplanService, private datePipe: DatePipe, private dialog: MatDialog) {
 
   
  }
  
  handleChange(){
    console.log("tippe")
    console.log((this.convertTimeToMinutes(this.endTime)- this.convertTimeToMinutes(this.startTime)))
    if(((this.convertTimeToMinutes(this.endTime)- this.convertTimeToMinutes(this.startTime)) % this.interval ) != 0){
      console.log("so abba needa")

    }

  }
  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }
  



  swipeLeft(event: any) {

    if (event.isFinal) {

      const isLast = this.selectedIndex === this.shiftCategorie.length;
      this.selectedIndex = isLast ? this.selectedIndex : this.selectedIndex + 1;

    }


  }

  swipeRight(event: any) {

    if (event.isFinal) {
        const isFirst = this.selectedIndex === 0;
        this.selectedIndex = isFirst ? this.selectedIndex : this.selectedIndex - 1;
    }

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

    
    const element = document.getElementById("md-content");

    this.shiftplanService.categoryNames.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftCategoryNames = newValue;
      this.updateCat();

    });

    this.shiftplanService.categories.subscribe((newValue) => {

      // Update the component with the new value
      this.isAnimationDisabled = true;
      this.shiftCategorie = newValue;

      setTimeout(() => {
        this.isAnimationDisabled = false;
      }, 0);

      });
    


    this.shiftplanService.updateCategories();

   
    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })

   


    interval(10000) // Interval of 10 seconds (10000 milliseconds)
      .subscribe(() => {
      
        this.shiftplanService.updateCategories(); // Updating Category var 
      });


  
  
  //HammerJs for swipe lft, right
  if (element instanceof HTMLElement) {
    
    const hammer = new Hammer(element);
    hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });


    hammer.on('panleft panright', (event) => {
   
      
      if (event.direction === Hammer.DIRECTION_LEFT) {
        if ((event.pointerType === 'mouse' && (event.angle <= 180 && event.angle >= 145 || event.angle <= -145 && event.angle >= -180)) || (event.pointerType === 'touch' && event.angle >= -150 && event.angle <= -130)) {
        this.swipeLeft(event);
        }
      } else if (event.direction === Hammer.DIRECTION_RIGHT) {
        if ((event.pointerType === 'mouse' && event.angle >= -45 && event.angle <= 45) || (event.pointerType === 'touch' && event.angle >= -140 && event.angle <= -100)) {
        this.swipeRight(event)
        }
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

}
