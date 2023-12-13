import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, HammerModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabLink } from '@angular/material/tabs';
import { UserListComponent } from './Dialogs/shiftplan/user-list-dialog/user-list.component';
import { DashboardactivityComponent } from './Dashboard Component/dashboardactivity/dashboardactivity.component';
import {MatNativeDateModule} from '@angular/material/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { DelCatDialogComponent } from './Dialogs/shiftplan/del-cat-dialog/del-cat-dialog.component';
import { ShiftBreakDialogComponent } from './Dialogs/shiftplan/shift-break-dialog/shift-break-dialog.component';
import { GlobalUserListComponent } from './Dialogs/global/global-userlist-dialog/global-user-list.component';
import { DelUserDialogComponent } from './Dialogs/global/del-user-dialog/del-user-dialog.component';
import { SubmitDialogComponent } from './Dialogs/submit-dialog/submit-dialog.component';
import { AddUserFormComponent } from './Dialogs/global/add-user-form/add-user-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ServiceWorkerModule } from '@angular/service-worker';
import { register } from 'swiper/element/bundle';
import { TesterComponent } from './tester/tester.component';
import { AddCatDialogComponent } from './Dialogs/shiftplan/add-cat-dialog/add-cat-dialog.component';
import { EventHubComponent } from './HUB/event-hub/event-hub.component';
import { ShiftplanLandingComponent } from './Shiftplan Component/shiftplan-landing/shiftplan-landing.component';
import { DashboardlandingComponent } from './Dashboard Component/dashboardlanding/dashboardlanding.component';
import { AddShiftblockComponent } from './Dialogs/shiftplan/add-shiftblock/add-shiftblock.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker'; 
import { AddEventComponent } from './Dialogs/global/add-event/add-event.component';
import { HeaderComponent } from './header/header.component';
import { EventPreviewComponent } from './HUB/event-preview/event-preview.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './User/dialog/login/login.component';
import { RegisterComponent } from './User/dialog/register/register.component';
// register Swiper custom elements
register();




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
    DelCatDialogComponent,
    ShiftBreakDialogComponent,
    GlobalUserListComponent,
    DelUserDialogComponent,
    SubmitDialogComponent,
    AddUserFormComponent,
    TesterComponent,
    AddCatDialogComponent,
    EventHubComponent,
    ShiftplanLandingComponent,
    DashboardlandingComponent,
    AddShiftblockComponent,
    AddEventComponent,
    HeaderComponent,
    EventPreviewComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
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
    DragDropModule,
    MatCardModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      //registrationStrategy: 'registerWhenStable:30000'
    })
     

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class AppModule  {
  constructor(
    private matIconRegistry: MatIconRegistry,  // import the MatIconRegistry
    private domSanitizer: DomSanitizer        // import the DomSanitizer
  ) {




    this.matIconRegistry.addSvgIcon(
      "dashboard",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/user.svg")

    );

    this.matIconRegistry.addSvgIcon(
      "shiftplan",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/shiftplan.svg")

    );

    this.matIconRegistry.addSvgIcon(
      "locked",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/locked.svg")

    );

    this.matIconRegistry.addSvgIcon(
      "home",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/home.svg")

    );

    this.matIconRegistry.addSvgIcon(
      "unlocked",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/unlocked.svg")

    );

    this.matIconRegistry.addSvgIcon(
      "userlist",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/userlist.svg")

    );

    this.matIconRegistry.addSvgIcon(
      "delete",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/delete.svg")

    );
  }

}
