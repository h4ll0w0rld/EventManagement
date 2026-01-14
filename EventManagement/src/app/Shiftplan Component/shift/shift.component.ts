import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { ShiftplanService } from 'src/app/core/features/shiftplan/shiftplan.service';
import { MatDialog } from '@angular/material/dialog';
import { ShiftBreakDialogComponent } from 'src/app/Dialogs/shiftplan/shift-break-dialog/shift-break-dialog.component';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { DeleteShiftDialogComponent } from 'src/app/Dialogs/shiftplan/delete-shift-dialog/delete-shift-dialog.component';



@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent {

  @Input() intervall: number = 0;
  @Input() shift: Shift = new Shift(0, 0, 0, [], false);
  @Input() nextShift: Shift | undefined = new Shift(0, 0, 0, [], false);
  @Input() catId: number = -1;

  //@Input() nextShift: Shift = new Shift (0,0,0,[], false);

  unlocked = false;
  toggled = false;
  //prioActivities: number = 2;
  //cardWidth: number = 200;
  @ViewChild('prioActivitiesContainer') prioActivitiesContainer!: ElementRef;

  visibleActivities: Activity[] = [];
  hiddenActivities: Activity[] = [];

  constructor(public shiftplanService: ShiftplanService, private dialog: MatDialog, public eventService: EventServiceService) { }

  ngAfterViewInit() {
    this.calculateVisibleActivities();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateVisibleActivities();
  }

  calculateVisibleActivities() {
    if (!this.prioActivitiesContainer) return;

    const TOGGLE_WIDTH = 56; // MUSS exakt zu SCSS passen
    const containerWidth =
      this.prioActivitiesContainer.nativeElement.offsetWidth - TOGGLE_WIDTH;


    const cardMinWidth = 150;
    const gap = 16;

    const cardsPerRow = Math.floor(
      (containerWidth -1) / (cardMinWidth + gap)
    );

    const maxVisible = Math.max(2, cardsPerRow);

    this.visibleActivities = this.shift.activities.slice(0, maxVisible);
    this.hiddenActivities = this.shift.activities.slice(maxVisible);

    if (this.hiddenActivities.length === 0) {
      this.toggled = false;
    }

    // CSS-Variable setzen → alle Zeilen benutzen exakt dieselbe Spaltenanzahl
    this.prioActivitiesContainer.nativeElement.style.setProperty(
      '--cards-per-row',
      `${maxVisible}`
    );
  }

  delShiftDialog() {

    let dialogRef = this.dialog.open(DeleteShiftDialogComponent,
      {
        data: {
          _catId: this.catId,
          _shift: this.shift
        },
        width: '90vw',
        height: 'auto'
      });
  }

  shiftBreakDialog() {

    let dialogRef = this.dialog.open(ShiftBreakDialogComponent,
      {
        data: {
          shift: this.shift,
          mainMessage: "Möchtest du diese Schicht pausieren?",
          subMessage: "Wenn du die Schicht pausierst können sich zu dieser Zeit keine Personen eintragen."
        },
        width: '90vw',
        height: 'auto',
      });
  }
}

