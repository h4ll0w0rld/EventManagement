import { Component, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddShiftblockComponent } from 'src/app/Dialogs/shiftplan/add-shiftblock/add-shiftblock.component';
import { DelCatDialogComponent } from 'src/app/Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-shift-category',
  templateUrl: './shift-category.component.html',
  styleUrls: ['./shift-category.component.scss']
})
export class ShiftCategoryComponent {
  @Input() content: CategoryContent = new CategoryContent(0, "","",0, []);
  @Input() categoryName: string = "";

  unlocked: boolean = false;

  constructor(private dialog: MatDialog, public shiftplanService: ShiftplanService) {

    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })

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

  delCatDialog(_cat: CategoryContent) {

    let delMessage = "Möchtest du " + _cat.name + " wirklich löschen?";

    let dialogRef = this.dialog.open(DelCatDialogComponent,
      {
        data: {
          message: delMessage,
          catId: _cat.id
        },
        width: '90vw',
        height: 'auto',
      }

    );
  }

  commingSoon() {

  }

}

