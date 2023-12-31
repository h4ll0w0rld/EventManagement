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
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-event-hub',
  templateUrl: './event-hub.component.html',
  styleUrls: ['./event-hub.component.scss']
})
export class EventHubComponent {

  private refreshInterval: Subscription = Subscription.EMPTY;;
  constructor(private elementRef: ElementRef, private dialog: MatDialog, public hubservice: EventhubService, private router: Router, private shiftplanService: ShiftplanService,private authService:AuthService, private eventService: EventServiceService) {


  
  }
  clicked(){
    
    this.eventService.getRoles();
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
    console.log("Current Event: ", _event)
    this.eventService.setCurrentEvent(_event);
    //this.eventService.shiftplanService.event = _event;
    // console.log(_event, "loaded")
    // this.eventService.currentEvent = _event;
    localStorage.setItem("event", JSON.stringify(_event));
    // console.log(localStorage.getItem("event"));
  }



  ngOnInit() {
    this.hubservice.getUsersEvents();

    const intervalTime = 5000;

    this.refreshInterval = interval(intervalTime).pipe(
      switchMap(async () => this.hubservice.getUsersEvents()) // Replace 'fetchData()' with your API call method
    ).subscribe(
      (data) => {
        // Handle the fetched data (e.g., update component properties)
        // Example: this.data = data;
      },
      (error) => {
        // Handle errors if any
        console.error('Error fetching data:', error);
      }
    );
  }




}

