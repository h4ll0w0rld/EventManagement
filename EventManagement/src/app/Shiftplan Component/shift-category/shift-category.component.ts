import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shift-category',
  templateUrl: './shift-category.component.html',
  styleUrls: ['./shift-category.component.scss']
})
export class ShiftCategoryComponent {
  @Input() category_name: string = "";

  shifts: string[] = ["Morning", "Afternoon", "Night"];

  intervall: number = 3;

}

