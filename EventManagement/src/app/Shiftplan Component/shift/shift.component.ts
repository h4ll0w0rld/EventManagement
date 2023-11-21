import { Component, HostListener, Input } from '@angular/core';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { MatDialog } from '@angular/material/dialog';
import { ShiftBreakDialogComponent } from 'src/app/Dialogs/shiftplan/shift-break-dialog/shift-break-dialog.component';



@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {

  @Input() intervall: number = 0;
  @Input() shift: Shift = new Shift(0,0,0,[], false);
  @Input() nextShift: Shift | undefined = new Shift (0,0,0,[], false);
  //@Input() nextShift: Shift = new Shift (0,0,0,[], false);

  prioActivities: number = 2;
  toggled = false;
  
  @HostListener('window:scroll', ['$event'])
  onScroll(){
    //console.log("HIER wird gescrollt !!")
  }

  unlocked = false;

  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog) {}


  ngOnInit() {

    this.shiftplanService.editmode$.subscribe(value => {
      this.unlocked = value;
    })
  }

  shiftBreakDialog() {

    let dialogRef = this.dialog.open(ShiftBreakDialogComponent,
      {
        data: {
          shift: this.shift,
          mainMessage: "Möchtest du diese Schicht pausieren?",
          subMessage: "Wenn du die Schicht pausierst können sich zu dieser Zeit keine Personen eintragen."
        },
        width: '95vh',
        height: 'auto',
      }

    );

  }
}

