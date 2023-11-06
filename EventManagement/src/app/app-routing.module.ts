import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftPlanComponent } from './Shiftplan Component/shift-plan/shift-plan.component';
import { DashboardComponent } from './Dashboard Component/dashboard/dashboard.component';
import { TesterComponent } from './tester/tester.component';
import { ShiftplanLandingComponent } from './Shiftplan Component/shiftplan-landing/shiftplan-landing.component';
import { EventHubComponent } from './event-hub/event-hub.component';


const routes: Routes = [
  {path:'dashboard', component:DashboardComponent }, 
  {path: 'shiftplan', component:ShiftPlanComponent },
  {path: '', component:EventHubComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
