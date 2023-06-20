import { Component } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { DashboardService } from '../Services/Dashboard Service/dashboard.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  password = "";
  showContainer = false;

  constructor(private shiftplanService: ShiftplanService, private dashboardService: DashboardService) {}


  submitPassword() {

    const storedPassword = localStorage.getItem('authent');

    localStorage.setItem('authent', this.password);
    this.shiftplanService.updatePasswort(this.password);
    this.dashboardService.updatePasswort(this.password);
    this.showContainer = false;
  }

  isAuthenticated() {

    const storedPassword = localStorage.getItem('authent');
    return storedPassword !== null && storedPassword !== '';
  }


}
