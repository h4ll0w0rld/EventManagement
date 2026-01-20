import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';

import { EventModel } from 'src/app/Object Models/EventModel';
import { ConfigService } from '../../../Services/config.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/Object Models/user/user';

@Injectable({
  providedIn: 'root'
})
export class EventhubService {

  /** Currently logged-in user */
  private loggedInUser: User | null = null;

  /** Events belonging to the user */
  private eventsSubject = new BehaviorSubject<EventModel[]>([]);
  events$ = this.eventsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private auth: AuthService
  ) {

    // Keep user in sync with AuthService
    this.auth.user$.subscribe(user => {
      this.loggedInUser = user;
      // Refresh events automatically when login changes
      if (user) this.loadUserEvents();
    });
  }

  /**
   * Loads all events for the current user
   */
  loadUserEvents() {
    
    if (!this.loggedInUser) return;
    const url = `${this.config.rootUrl}/user/eventsByUser/user_id/${this.loggedInUser.id}`;

    this.http.get<EventModel[]>(url, {headers: this.auth.getAuthHeaders()})
      .pipe(
        catchError(err => {
          if (err.status === 401) this.auth.refreshToken();
          return of([]);
        })
      )
      .subscribe(events => {this.eventsSubject.next(events);});
  }

  
  /**
   * Adds a new event
   */
  addEvent(event: EventModel) {
    const url = `${this.config.rootUrl}/event/add`;

    const body = {
      name: event.name,
      description: event.description,
      startDate: this.formatDate(event.startDate),
      endDate: this.formatDate(event.endDate),
      location: event.location
    };

    this.http.post(url, body, {headers:this.auth.getAuthHeaders()})
      .pipe(
        switchMap(() => {
          // Reload events after add
          return this.http.get<EventModel[]>(
            `${this.config.rootUrl}/user/eventsByUser/user_id/${this.loggedInUser?.id}`,
           {headers:this.auth.getAuthHeaders()}
          );
        }),
        catchError(err => {
         
          return of([]);
        })
      )
      .subscribe(events => this.eventsSubject.next(events));
  }

  /**
   * Delete event (future implementation)
   */
  deleteEvent(eventId: number) {
    const url = `${this.config.rootUrl}/event/delete/event_id/${eventId}`;

    return this.http.delete(url, {headers:this.auth.getAuthHeaders()})
      .pipe(
        catchError(err => {
          return of(null);
        })
      );
  }

  /**
   * Format date for backend
   */
  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${min}`;
  }
}
