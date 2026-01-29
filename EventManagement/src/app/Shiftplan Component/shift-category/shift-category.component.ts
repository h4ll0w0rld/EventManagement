import { Component, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddShiftblockComponent } from 'src/app/Dialogs/shiftplan/add-shiftblock/add-shiftblock.component';
import { DelCatDialogComponent } from 'src/app/Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { EventService } from 'src/app/core/features/events/event.service';
import { ShiftplanService } from 'src/app/core/features/shiftplan/shiftplan.service';

@Component({
  selector: 'app-shift-category',
  templateUrl: './shift-category.component.html',
  styleUrls: ['./shift-category.component.scss']
})
export class ShiftCategoryComponent {
  @Input() content: CategoryContent = new CategoryContent(0, "","",0, []);
  @Input() categoryName: string = "";
  @Input() unlocked: boolean = false;

  

  constructor(private dialog: MatDialog, public shiftplanService: ShiftplanService, public eventService: EventService) {

    // this.shiftplanService.editmode$.subscribe(value => {
    //   this.unlocked = value;
    // })

  }
  test(){
    console.log("TEst in shift category: ", this.content)
  }

  addShiftblock() {
    console.log("content cat in addShiftblock:", this.content);
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

  calculateBreakTime(_nextTime: Date, _thisTime: Date) {

    const dif = _nextTime.getTime() - _thisTime.getTime();

    const hours = Math.floor(dif / 3600000); // 1 Stunde = 3600000 Millisekunden
    const minutes = Math.floor((dif % 3600000) / 60000);

    let res = '';

    if (hours > 0) {
      res += hours + ' Std. ';
    }
    if (minutes > 0 || hours === 0) {
      res += minutes + ' Min.';
    }

    return res;
  }

  commingSoon() {

  }


}

