import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shift-request',
  templateUrl: './shift-request.component.html',
  styleUrls: ['./shift-request.component.scss']
})
export class ShiftRequestComponent {
  @Input() _shiftRequests:any;
}
