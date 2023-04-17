import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShiftPlanComponent } from './shift-plan/shift-plan.component';
import { ShiftComponent } from './shift/shift.component';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ShiftPlanComponent,
    ShiftComponent,
    MenuComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
