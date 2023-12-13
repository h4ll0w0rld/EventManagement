import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { AddEventComponent } from '../Dialogs/global/add-event/add-event.component';
import { EventhubService } from '../../Services/Eventhub Service/eventhub.service';
import { Router } from '@angular/router';
import { AddEventComponent } from '../../Dialogs/global/add-event/add-event.component';
import { ShiftplanService } from '../../Services/Shiftplan Service/shiftplan.service';

import { EventModel } from '../../Object Models/EventModel';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';
import { AuthService } from 'src/app/Services/Auth Service/auth.service';
import { LoginComponent } from 'src/app/User/dialog/login/login.component';
import { RegisterComponent } from 'src/app/User/dialog/register/register.component';

@Component({
  selector: 'app-event-hub',
  templateUrl: './event-hub.component.html',
  styleUrls: ['./event-hub.component.scss']
})
export class EventHubComponent {


  constructor(private elementRef: ElementRef, private dialog: MatDialog, public hubservice: EventhubService, private router: Router, private shiftplanService: ShiftplanService,private authService:AuthService, private eventService: EventServiceService) {


  
  }
  //test Func
  click(){
    //this.authService.loginUser("nilss.begann@hsfurtwangen.de", "qwerty12345678");
    this.dialog.open(LoginComponent,
      {
       
        width: '95vh',
        height: 'auto',
      }

    );
  }
  click2(){
    //this.authService.loginUser("nilss.begann@hsfurtwangen.de", "qwerty12345678");
    this.dialog.open(RegisterComponent,
      {
       
        width: '95vh',
        height: 'auto',
      }

    );
  }

  click3(){
    //this.authService.loginUser("nilss.begann@hsfurtwangen.de", "qwerty12345678");
   this.authService.refreshAccess()
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
    this.hubservice.getUsersEvents();
  }




}

