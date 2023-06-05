import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftCategoryComponent } from './Shiftplan Component/shift-category/shift-category.component';
import { ShiftPlanComponent } from './Shiftplan Component/shift-plan/shift-plan.component';
import { ActivityComponent } from './Shiftplan Component/activity/activity.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './Dashboard Component/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ShiftComponent } from './Shiftplan Component/shift/shift.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabLink } from '@angular/material/tabs';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardactivityComponent } from './Dashboard Component/dashboardactivity/dashboardactivity.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UserLoginComponent } from './user-login/user-login.component';

import { MatDialogModule } from '@angular/material/dialog';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ShiftCategoryComponent,
    ShiftPlanComponent,
    ActivityComponent,
    DashboardComponent,
    ShiftComponent,
    UserListComponent,
    DashboardactivityComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,  // import the MatIconRegistry
    private domSanitizer: DomSanitizer        // import the DomSanitizer
  ) {
    // Use MatIconRegistry to add an SVG icon to the registry
    // 'dashboard' is the name of the icon, and '../assets/icons/dashboard.svg' is the URL to the SVG file
    this.matIconRegistry.addSvgIcon(
      "dashboard",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/dashboard.svg")

    );
    // Add another SVG icon to the registry
    // 'shiftplan' is the name of the icon, and '../assets/icons/dashboard.svg' is the URL to the SVG file
    this.matIconRegistry.addSvgIcon(
      "shiftplan",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/shift.svg")

    );
  }

}
