import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftPlanComponent } from './Shiftplan Component/shift-plan/shift-plan.component';
import { DashboardComponent } from './Dashboard Component/dashboard/dashboard.component';
import { TesterComponent } from './tester/tester.component';
import { ShiftplanLandingComponent } from './Shiftplan Component/shiftplan-landing/shiftplan-landing.component';
import { EventHubComponent } from './HUB/event-hub/event-hub.component';
import { DashboardlandingComponent } from './Dashboard Component/dashboardlanding/dashboardlanding.component';
import { AuthLandingComponent } from './User/auth-landing/auth-landing.component';
import { InviteLandingComponent } from './User/invite-landing/invite-landing.component';


const routes: Routes = [
  {path:'dashboard', component:DashboardlandingComponent }, 
  {path: 'shiftplan', component:ShiftplanLandingComponent },
  {path: '', component:EventHubComponent},
  {path: 'authLanding', component:AuthLandingComponent},
  {path: 'authLanding/:eventId/:userId/:fName/:lName', component:AuthLandingComponent},
  {path: 'inviteLanding/:eventId/:userId/:fName/:lName', component:InviteLandingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
