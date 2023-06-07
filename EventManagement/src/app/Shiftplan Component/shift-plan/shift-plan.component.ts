import { Component, ViewEncapsulation } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DelCatDialogComponent } from 'src/app/del-cat-dialog/del-cat-dialog.component';

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

  

  constructor(public shiftplanService: ShiftplanService, private datePipe: DatePipe, private dialog: MatDialog) {
 
    
  }

  addCat(): void {

    const date = this.datePipe.transform(this.chosenDate, "yyyy-MM-dd");
    this.shiftplanService.addCategory(this.categoryName, this.description, this.interval, this.numberOfActivities,this.startTime, this.endTime, date)
    this.shiftplanService.updateCategories();
    
    this.updateCat();
  }

  delCategory(_id:number){
    this.shiftplanService.delCategory(_id);

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

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DelCatDialogComponent, {

    });
  }

  touchStart() {
    console.log("test start");
    this.openDialog();

  }

  touchEnd() {
    console.log("test end");

  }

}
