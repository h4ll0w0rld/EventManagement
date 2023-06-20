import { Component, ElementRef } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';
import { DashboardService } from '../Services/Dashboard Service/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  constructor(private shiftplan: ShiftplanService, private dashboard: DashboardService, private router: Router, private elementRef: ElementRef) {

  }

  clicked() {
    //this.shiftplan.updateCategorieNames();
    this.shiftplan.updateCategories();
    this.shiftplan.getAllUser();
    this.dashboard.updateUserActivity();


  }

  isActiveRoute(routerPath: string) {

    return this.router.url === routerPath;
  }

}
