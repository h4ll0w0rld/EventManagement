import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { AddEventComponent } from '../Dialogs/global/add-event/add-event.component';
import { EventhubService } from '../../Services/Eventhub Service/eventhub.service';
import { Router } from '@angular/router';
import { AddEventComponent } from '../../Dialogs/global/add-event/add-event.component';
import { ShiftplanService } from '../../Services/Shiftplan Service/shiftplan.service';

import { EventModel } from '../../Object Models/EventModel';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-event-hub',
  templateUrl: './event-hub.component.html',
  styleUrls: ['./event-hub.component.scss']
})
export class EventHubComponent {


  constructor(private elementRef: ElementRef, private dialog: MatDialog, public hubservice: EventhubService, private router: Router, private shiftplanService: ShiftplanService, private eventService: EventServiceService) {

  }
  addEvent() {
    console.log("Event wird hinzugefügt...")
  }
  addCatDialog() {

    this.dialog.open(AddEventComponent, {
      data: {

      },
      width: '80vw',
      height: 'auto',
    })
  }

  loadEvent(_event: EventModel) {
    this.shiftplanService.event = _event;
    console.log(_event, "loaded")
    this.eventService.currentEvent = _event;
    localStorage.setItem("event", JSON.stringify(_event));
    console.log(localStorage.getItem("event"));
  }



  ngOnInit() {
    this.hubservice.updateAllEvents();
  }




}

