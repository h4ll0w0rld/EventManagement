import { Injectable } from '@angular/core';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftplanService {


  categoriesContent = [
    new CategoryContent(0, "Bar", [new Shift(0, 0, []), new Shift(0, 0, []), new Shift(0, 0, []), new Shift(0, 0, [])]),
    new CategoryContent(0, "Sicherheit", []),
    new CategoryContent(0, "Bühne 1", [])
  ];

  categoryNames = ["Bar", "Sicherheit", "Bühne 1"];


  constructor() { }
}
