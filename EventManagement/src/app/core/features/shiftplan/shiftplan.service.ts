import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CategoryContent } from 'src/app/Object Models/Shiftplan Component/category-content';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { User } from 'src/app/Object Models/user/user';
import { EventService } from '../events/event.service';

@Injectable({ providedIn: 'root' })
export class ShiftplanService {

  categories: Subject<CategoryContent[]> = new Subject<CategoryContent[]>();
  editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService, private eventService: EventService) {
    const stored = localStorage.getItem('editmode');
    if (stored) this.editMode.next(JSON.parse(stored));
  }

  toggleEditMode(state: boolean) {
    this.editMode.next(state);
    localStorage.setItem('editmode', JSON.stringify(state));
  }

  getCategories(): Observable<CategoryContent[]> {
    const eventId = this.eventService.currentEvent?.id;
    if (!eventId) return of([]);
    return this.api.get<CategoryContent[]>(`/shiftCategory/${eventId}/all`);
  }

  addShiftBlock(categoryId: number, shiftBlock: any): Observable<any> {
    const eventId = this.eventService.currentEvent?.id;
    if (!eventId) return of(null);
    return this.api.post(`/shiftCategory/${eventId}/addShiftBlockToCategory/shift_category_id/${categoryId}`, { shiftBlocks: [shiftBlock] });
  }
}
