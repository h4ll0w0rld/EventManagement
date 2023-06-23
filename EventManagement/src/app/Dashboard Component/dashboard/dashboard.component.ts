import { Component } from '@angular/core';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';
import { DashboardService } from 'src/app/Services/Dashboard Service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  shiftByUser: userActivity[] = [];

  selectedUser: User = new User(1, "Nilsooo", "");

  allUser:User[] = []     //Can be updated using: /dashboarservice.getAllUser()

  constructor(private dashboardService: DashboardService) {}


    clicked(){
     
     const stored:any = localStorage.getItem('selected-dashboard-user');
     const storedUser: any = JSON.parse(stored);
      
      const test = this.allUser.find(u => u.uuid === storedUser.uuid)
      this.selectedUser = <User>test;
      this.dashboardService.updateUserActivity(this.selectedUser.uuid)
    
    }

  ngOnInit() {

    this.dashboardService.getAllUser();
 
   

    this.dashboardService.shiftsByUser.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftByUser = newValue;

    });

    this.dashboardService.userList.subscribe((newValue) => {
      // Update the component with the new value
      this.allUser = newValue;
      this.clicked()

    });
    
    
    this.dashboardService.updateUserActivity();
  }


  changeUser() {

    this.dashboardService.updateUserActivity(this.selectedUser.uuid);
    localStorage.setItem('selected-dashboard-user', JSON.stringify(this.selectedUser));
   
  }
}
