import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { AddEventComponent } from '../Dialogs/global/add-event/add-event.component';
import { EventhubService } from '../Services/Eventhub Service/eventhub.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-hub',
  templateUrl: './event-hub.component.html',
  styleUrls: ['./event-hub.component.scss']
})
export class EventHubComponent {
  constructor(private dialog: MatDialog, public hubservice: EventhubService, private router: Router){

  }
  addEvent(){
    console.log("Event wird hinzugefügt...")
  }
  addCatDialog() {

    // this.dialog.open(AddEventComponent, {
    //   data: {

    //   },
    //   width: '95vh',
    //   height: 'auto',
    // })
  }

  loadEvent(){
    console.log("cklicked ")
    //this.router.navigate(['/shiftplan']);
  }


  ngOnInit(){
    this.hubservice.updateAllUser();
  }
}

