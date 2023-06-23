import { Component, Input } from '@angular/core';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';


@Component({
  selector: 'app-shift-category',
  templateUrl: './shift-category.component.html',
  styleUrls: ['./shift-category.component.scss']
})
export class ShiftCategoryComponent {
  @Input() content: CategoryContent = new CategoryContent(0, "","",0, []);
  @Input() categoryName: string = "";

}

