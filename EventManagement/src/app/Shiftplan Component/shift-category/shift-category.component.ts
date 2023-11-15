import { Component, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddShiftblockComponent } from 'src/app/Dialogs/shiftplan/add-shiftblock/add-shiftblock.component';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';

@Component({
  selector: 'app-shift-category',
  templateUrl: './shift-category.component.html',
  styleUrls: ['./shift-category.component.scss']
})
export class ShiftCategoryComponent {
  @Input() content: CategoryContent = new CategoryContent(0, "","",0, []);
  @Input() categoryName: string = "";

  //shifts: string[] = ["Morning", "Afternoon", "Night", "", "","", "", "", "", "",""];
  //intervall: number = 3;
  // shift: Shift;


  constructor(private dialog: MatDialog) {


  }

  addShiftblock() {

    this.dialog.open(AddShiftblockComponent, {
      data: {
        catContent: this.content
      },
      width: '90vw',
      height: 'auto',
    })
  }

}

