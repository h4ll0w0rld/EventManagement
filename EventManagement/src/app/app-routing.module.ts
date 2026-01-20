import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftPlanComponent } from './Shiftplan Component/shift-plan/shift-plan.component';
import { DashboardComponent } from './Dashboard Component/dashboard/dashboard.component';
import { ShiftplanLandingComponent } from './Shiftplan Component/shiftplan-landing/shiftplan-landing.component';
import { DashboardlandingComponent } from './Dashboard Component/dashboardlanding/dashboardlanding.component';
import { AuthLandingComponent } from './User/auth-landing/auth-landing.component';
import { InviteLandingComponent } from './User/invite-landing/invite-landing.component';
import { AddEventComponent } from './Dialogs/global/add-event/add-event.component';
import { Userlist2Component } from './userlist2/userlist2.component';



const routes: Routes = [
  {path:'', component:DashboardlandingComponent }, 
  {path: 'shiftplan', component:ShiftplanLandingComponent },
  {path: 'authLanding', component:AuthLandingComponent},
  {path: 'userlist', component:Userlist2Component},
  {path: 'authLanding/:eventId/:userId/:fName/:lName', component:AuthLandingComponent},
  {path: 'inviteLanding', component:InviteLandingComponent},
  {path: 'add-event', component: AddEventComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
