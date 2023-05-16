import { Component } from '@angular/core';
import { ShiftplanService } from 'src/app/Services/Shiftplan Service/shiftplan.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  
  constructor(private shiftplan:ShiftplanService){

  }
  
  clicked(){
    this.shiftplan.updateCategorieNames();
    this.shiftplan.updateCategories();


  }

}
