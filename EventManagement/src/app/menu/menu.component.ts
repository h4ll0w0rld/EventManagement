import { Component } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { DashboardService } from '../Services/Dashboard Service/dashboard.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  constructor(private shiftplan: ShiftplanService, private dashboard: DashboardService) {

  }

  clicked() {
    //this.shiftplan.updateCategorieNames();
    this.shiftplan.updateCategories();
    this.shiftplan.getAllUser();
    this.dashboard.updateUserActivity();


  }

}
