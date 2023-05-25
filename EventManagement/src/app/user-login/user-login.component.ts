import { Component } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

  user: any = [];
  
  constructor(public shiftplanService:ShiftplanService){

  }

  click(){
    this.user = this.shiftplanService.getAllUser();

  }

}
