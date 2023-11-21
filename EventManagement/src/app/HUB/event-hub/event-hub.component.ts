import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { AddEventComponent } from '../Dialogs/global/add-event/add-event.component';
import { EventhubService } from '../../Services/Eventhub Service/eventhub.service';
import { Router } from '@angular/router';
import { AddEventComponent } from '../../Dialogs/global/add-event/add-event.component';
import { ShiftplanService } from '../../Services/Shiftplan Service/shiftplan.service';
import { ConfigService } from '../../Services/config.service';
import { EventModel } from '../../Object Models/EventModel';

@Component({
  selector: 'app-event-hub',
  templateUrl: './event-hub.component.html',
  styleUrls: ['./event-hub.component.scss']
})
export class EventHubComponent {
  constructor(private dialog: MatDialog, public hubservice: EventhubService, private router: Router  , private configService: ConfigService, private shiftplanService: ShiftplanService){

  }
  addEvent(){
    console.log("Event wird hinzugefügt...")
  }
  addCatDialog() {
    console.log("ALIIIIIIIVETTTTTTTTTTEEEEE")
    this.dialog.open(AddEventComponent, {
      data: {

       },
       width: '95vh',
       height: 'auto',
     })
  }

  loadEvent(_event: EventModel){
    this.shiftplanService.event = _event;
    localStorage.setItem("event", JSON.stringify(_event));
    console.log(localStorage.getItem("event"));
  }

  formatTime(_startDate: Date, _endDate: Date ){
    console.log("Ecvent start: ", _startDate)
  }

  ngOnInit(){
    this.hubservice.updateAllUser();
  }
}

