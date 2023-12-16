import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftplanService } from '../../../Services/Shiftplan Service/shiftplan.service';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-del-cat-dialog',
  templateUrl: './del-cat-dialog.component.html',
  styleUrls: ['./del-cat-dialog.component.scss']
})
export class DelCatDialogComponent {

  constructor(public shiftplanService: ShiftplanService, @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DelCatDialogComponent>, public eventService: EventServiceService, public router: Router) { }


  delCategory() {
    this.eventService.delCategory(this.data.catId);
    this.matDialogRef.close();
    this.reloadComponent()
    this.eventService.updateCategories();
  }

  reloadComponent(self: boolean = true, urlToNavigateTo?: string) {
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {

      })
    })
  }


}
