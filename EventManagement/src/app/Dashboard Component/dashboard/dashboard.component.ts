import { Component } from '@angular/core';
import { Shift } from 'src/app/Object Models/Dashboard Component/shift';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';
import { DashboardService } from 'src/app/Services/Dashboard Service/dashboard.service';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  shiftsByUser: Shift[] = [];

  selectedUser: User = new User(-1, "", "", "", "");

  allUser: User[] = []

  shiftRequests: Shift[] = []
  // shiftsByUser = [
  //   {
  //     role: 'Bar',
  //     start: '14:00',
  //     end: '18:00',
  //     date: new Date('2024-09-14'),
  //     helpers: [
  //       { fName: 'Nils', lName: 'Bergmann', uuid: '1', role: 'Schichtleitung' },
  //       { fName: 'Elias', lName: 'Bollow', uuid: '2', role: 'Helfer' },
  //       { fName: 'Oskar', lName: 'Huber', uuid: '3', role: 'Helfer' },
  //       { fName: 'Yony', lName: 'Martens', uuid: '4', role: 'Helfer' } 
  //     ]
  //   },
  //   {
  //     role: 'Bar',
  //     start: '14:00',
  //     end: '18:00',
  //     date: new Date('2024-09-14'),
  //     helpers: [
  //       { fName: 'Nils', lName: 'Bergmann', uuid: '1', role: 'Schichtleitung' },
  //       { fName: 'Elias', lName: 'Bollow', uuid: '2', role: 'Helfer' },
  //       { fName: 'Oskar', lName: 'Huber', uuid: '3', role: 'Helfer' },
  //       { fName: 'Yony', lName: 'Martens', uuid: '4', role: 'Helfer' } // <- ist Du
  //     ]
  //   },
  //   {
  //     role: 'Bar',
  //     start: '14:00',
  //     end: '18:00',
  //     date: new Date('2024-09-14'),
  //     helpers: [
  //       { fName: 'Nils', lName: 'Bergmann', uuid: '1', role: 'Schichtleitung' },
  //       { fName: 'Elias', lName: 'Bollow', uuid: '2', role: 'Helfer' },
  //       { fName: 'Oskar', lName: 'Huber', uuid: '3', role: 'Helfer' },
  //       { fName: 'Yony', lName: 'Martens', uuid: '4', role: 'Helfer' } // <- ist Du
  //     ]
  //   },
  //   {
  //     role: 'SiBeKo',
  //     start: '14:00',
  //     end: '18:00',
  //     date: new Date('2024-09-14'),
  //     helpers: [
  //       { fName: 'Nils', lName: 'Bergmann', uuid: '1', role: 'Schichtleitung' },
  //       { fName: 'Elias', lName: 'Bollow', uuid: '2', role: 'Helfer' },
  //       { fName: 'Oskar', lName: 'Huber', uuid: '3', role: 'Helfer' },
  //       { fName: 'Yony', lName: 'Martens', uuid: '4', role: 'Helfer' } // <- ist Du
  //     ]
  //   },    // weitere Schichten...
  // ];


  constructor(private dashboardService: DashboardService, private eventService: EventServiceService) {
    this.dashboardService.shiftRequests.subscribe(shiftReqs => {
      this.shiftRequests = shiftReqs;
      console.log("updatet", this.shiftRequests)

    })
     this.dashboardService.shiftsByUser.subscribe(shiftReqs => {
      this.shiftsByUser = shiftReqs;
      console.log("updatet shifts ", this.shiftRequests)

    })

    const localUser: any = localStorage.getItem("user");
    this.selectedUser = JSON.parse(localUser)
    console.log("selected user: ", this.selectedUser.fName)

    //this.selectedUser = this.allUser

  }


  clicked() {

    const stored: any = localStorage.getItem('selected-dashboard-user');
    const storedUser: any = JSON.parse(stored);

    const test = this.allUser.find(u => u.uuid === storedUser.uuid)
    this.selectedUser = <User>test;
    console.log("USER", test)
    this.dashboardService.updateUserActivity(this.selectedUser.uuid, "confirmed")
    this.dashboardService.updateShiftReq(this.selectedUser.uuid, "requested")

  }


  ngOnInit() {

    this.eventService.getAllUser();

    this.dashboardService.shiftsByUser.subscribe((newValue) => {
      // Update the component with the new value
      //this.shiftsByUser = newValue;   //TTTTTTOOODODODODO

    });

    this.eventService.allUser.subscribe((newValue) => {
      // Update the component with the new value
      this.allUser = newValue;
      this.clicked()

    });

    //this.dashboardService.updateUserActivity();
  }

  

  changeUser() {

    this.dashboardService.updateUserActivity(this.selectedUser.uuid, "confirmed");
    this.dashboardService.updateShiftReq(this.selectedUser.uuid, "requested");
    localStorage.setItem('selected-dashboard-user', JSON.stringify(this.selectedUser));

  }
}
