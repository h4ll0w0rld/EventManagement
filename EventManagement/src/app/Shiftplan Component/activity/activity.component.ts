import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { User } from 'src/app/Object Models/user/user';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserListComponent } from 'src/app/Dialogs/shiftplan/user-list-dialog/user-list.component';
import { EventService } from 'src/app/core/features/events/event.service';
import { Observable, map, switchMap } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  @Input() activity = new Activity(1, new User(-1, "server", "dc", "", ""), "test");
  @Input() shiftId = 1;
  @Input() catId = -1;

  currUserAvailable: any;

  constructor(
    public shiftplanService: ShiftplanService, 
    public eventService: EventService, 
    private dialog: MatDialog, 
    private renderer: Renderer2, 
    private el: ElementRef, 
    private breakpointObserver: BreakpointObserver
  ) {}


  openUserList(event: MouseEvent | TouchEvent) {

    const dialogRef = this.dialog.open(UserListComponent,
      {
        data: {
          activity: this.activity,
          shiftId: this.shiftId
        },
        width: '400px',
        maxWidth: '90vw',
        maxHeight: '50vh',
        autoFocus: false,
        restoreFocus: false
      }
    );

    this.breakpointObserver
      .observe('(min-width: 1024px)')
      .subscribe(result => {
        if (result.matches) {
          const { x, y } = this.getClickPoint(event);
          this.positionDialog(dialogRef, x, y);
        }
      });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    })
  }

  private getClickPoint(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      return { x: event.clientX, y: event.clientY };
    }

    const touch = event.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }

  private positionDialog(
  dialogRef: MatDialogRef<any>,
  x: number,
  y: number
) {
  const dialogWidth = 360;
  const dialogHeight = 420; // grob, reicht
  const margin = 8;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let left = x;
  let top = y;

  // 👉 rechts / unten raus?
  if (left + dialogWidth > vw) {
    left = vw - dialogWidth - margin;
  }

  if (top + dialogHeight > vh) {
    top = vh - dialogHeight - margin;
  }

  // 👉 links / oben raus?
  if (left < margin) left = margin;
  if (top < margin) top = margin;

  dialogRef.updatePosition({
    left: `${left}px`,
    top: `${top}px`
  });
}



}
