import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { ShiftPlanComponent } from './shift-plan/shift-plan.component';
import { ShiftComponent } from './shift/shift.component';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
=======

import { MenuComponent } from './menu/menu.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftCategoryComponent } from './Shiftplan Component/shift-category/shift-category.component';
import { ShiftPlanComponent } from './Shiftplan Component/shift-plan/shift-plan.component';
import { ActivityComponent } from './Shiftplan Component/activity/activity.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './Dashboard Component/dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< Updated upstream
    ShiftPlanComponent,
    ShiftComponent,
    MenuComponent,
    
    
=======
    MenuComponent,
    ShiftCategoryComponent,
    ShiftPlanComponent,
    ActivityComponent,
    DashboardComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< Updated upstream
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
=======
    MatGridListModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,
    
    ],
>>>>>>> Stashed changes
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,  // import the MatIconRegistry
    private domSanitizer: DomSanitizer        // import the DomSanitizer
  ){
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
