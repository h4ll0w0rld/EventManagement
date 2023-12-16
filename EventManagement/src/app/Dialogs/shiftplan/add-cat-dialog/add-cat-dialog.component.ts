import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/Object Models/EventModel';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-add-shift-cat-form',
  templateUrl: './add-cat-dialog.component.html',
  styleUrls: ['./add-cat-dialog.component.scss']
})
export class AddCatDialogComponent implements OnInit {

  newCategory: any = {
    name: "",
    description: "",
    //eventId: 1,
    shiftBlocks: [],
  }

  eventStartDate = new Date('2023-08-10 13:00');
  eventEndDate = new Date('2023-08-13 12:00');
  currentEvent:EventModel = new EventModel(-1,"","",new Date(), new Date(),"");
  currentBlock: any = {
    intervall: 60,
    activitiesPerShift: 3,
    numberOfShifts: 0,
    startTime: this.eventStartDate,
    //endTime: new Date(),
    endTime: this.eventEndDate

  }

  minZeit: string;
  startTimeTime: string;

  constructor(public dialogRef: MatDialogRef<AddCatDialogComponent>, public eventService: EventServiceService, private authService: AuthService, private router: Router) {

    //this.newCategory.eventId = this.eventService.currentEvent.id;
    this.currentBlock.startTime = this.eventStartDate;
    this.minZeit = this.currentBlock.startTime.getHours() + ':' + this.currentBlock.startTime.getMinutes();

    this.startTimeTime = this.currentBlock.startTime.getHours() + ':' + this.currentBlock.startTime.getMinutes();
    console.log(this.minZeit);

    //this.updateEndDate();
  }


  isCatNameInvalid(): boolean {

    return this.newCategory.name.trim() === '';
  }

  addCat() {

    if (this.isCatNameInvalid()) {
      return
    }
    else {
      

        if (this.currentEvent.id != -1) {
          this.eventService.addCategory(this.newCategory.name, this.newCategory.description, this.currentEvent.id, this.newCategory.shiftBlocks);
          this.dialogRef.close();
          this.reloadComponent();
        }else{
          console.log("No Event loaded (ad-cat-dia)")
        }
      
    }

  }

  getTimeFormat(_date: string) {

    const date = new Date(_date);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes} Uhr`;

    return time;

  }

  reloadComponent(self: boolean = true, urlToNavigateTo?: string) {
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {

      })
    })
  }

  ngOnInit(){

    this.eventService.getCurrentEvent().subscribe((currentEvent: EventModel) => {
      this.currentEvent = currentEvent;
    })
    
  }


}

