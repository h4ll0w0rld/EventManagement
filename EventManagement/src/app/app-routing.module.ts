import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftPlanComponent } from './Shiftplan Component/shift-plan/shift-plan.component';
import { DashboardComponent } from './Dashboard Component/dashboard/dashboard.component';


const routes: Routes = [
  {path:'dashboard', component:DashboardComponent }, 
  {path: '', component:ShiftPlanComponent },
  // {
  //   path: 'secondary',
  //   loadChildren: () => import('./Shiftplan Component/shiftplan-landing/shiftplan-landing.component').then((m) => m.FeatureModule),
  //   outlet: 'secondary', // Use the named outlet
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
