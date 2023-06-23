import { Component, ViewEncapsulation } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { DelCatDialogComponent } from 'src/app/Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';

import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { interval } from 'rxjs';



@Component({
  selector: 'app-shift-plan',
  templateUrl: './shift-plan.component.html',
  styleUrls: ['./shift-plan.component.scss'],
  providers: [
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
  // touchstartX = 0
  // touchendX = 0
  // doubleTouchCount = 0;
  //locked / unlocked mode
  unlocked: boolean = false;
  //Active Mat tab 
  selectedIndex: number = 1;
  //Swipe function 
  xDown = null;                                                        
  yDown = null;                                                        

  colorControl = new FormControl('primary' as ThemePalette);

  constructor(public shiftplanService: ShiftplanService, private datePipe: DatePipe, private dialog: MatDialog) { }


  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  }
  


  addCat(): void {

    const date = this.datePipe.transform(this.chosenDate, "yyyy-MM-dd");
    if(this.checkUserInput()){
      console.log(this.endTime)

      this.shiftplanService.addCategory(this.categoryName, this.description, this.interval, this.numberOfActivities, this.startTime, this.endTime, date)
      this.shiftplanService.updateCategories();
    
      this.updateCat();
    } else {
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
 
 handleTouchStart(evt:any) {                                         
  this.xDown = evt.changedTouches[0].screenX;                                      
  this.yDown = evt.changedTouches[0].screenY;                                      
};                                                

handleTouchMove(evt:any) {
    if ( ! this.xDown || ! this.yDown ) {
        return;
    }

    var xUp = evt.changedTouches[0].screenX;                                    
    var yUp = evt.changedTouches[0].screenY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { /*most significant*/
        if ( xDiff > 0 ) {
          this.swipeLeft()
          
            /* left swipe */ 
        } else {
          this.swipeRight()
            /* right swipe */
          
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    this.xDown = null;
    this.yDown = null;                                             
};


  
swipeLeft() {
  
  const isLast = this.selectedIndex === this.shiftplanService.categoryCopy.length;
  this.selectedIndex = isLast ? this.selectedIndex : this.selectedIndex + 1;


}

swipeRight() {


const isFirst = this.selectedIndex === 0;
    this.selectedIndex = isFirst ? this.selectedIndex : this.selectedIndex - 1;


}


  ngOnInit() {

    

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

    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })

   
    this.shiftplanService.updateCategories()

    interval(3000) // Interval of 3 seconds 
      .subscribe(() => {
      
        
        this.shiftplanService.updateCategories()
         
      });

      document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
      document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);

 
  }

  openDialog(): void {
    this.dialog.open(DelCatDialogComponent, {

    });
  }

}
