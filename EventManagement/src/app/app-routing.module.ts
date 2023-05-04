import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftPlanComponent } from './Shiftplan Component/shift-plan/shift-plan.component';
import { DashboardComponent } from './Dashboard Component/dashboard/dashboard.component';


const routes: Routes = [
  {path:'dashboard', component:DashboardComponent }, 
  {path:'shiftplan', component:ShiftPlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
