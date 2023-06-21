import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShiftplanService } from '../../../Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-del-cat-dialog',
  templateUrl: './del-cat-dialog.component.html',
  styleUrls: ['./del-cat-dialog.component.scss']
})
export class DelCatDialogComponent {

  constructor(public shiftplanService: ShiftplanService, @Inject(MAT_DIALOG_DATA) public data: any, 
  private matDialogRef: MatDialogRef<DelCatDialogComponent>) {}


  delCategory(){
    this.shiftplanService.delCategory(this.data.catId);
    this.matDialogRef.close();
    this.shiftplanService.updateCategories();
  }

}
