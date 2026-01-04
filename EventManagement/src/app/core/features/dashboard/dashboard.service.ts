import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../../Services/config.service';
import { EventService } from '../events/event.service';
import { Shift } from 'src/app/Object Models/Dashboard Component/shift';
import { Activity } from 'src/app/Object Models/Dashboard Component/activity';
import { User } from 'src/app/Object Models/Dashboard Component/user';
import { ShiftCategory } from 'src/app/Object Models/Dashboard Component/shift-category';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  shiftsByUser: Subject<Shift[]> = new Subject<Shift[]>();
  shiftRequests: Subject<Shift[]> = new Subject<Shift[]>();
  userList: Subject<User[]> = new Subject<User[]>();

  constructor(
    private http: HttpClient,
    private eventService: EventService,
    private authService: AuthService,
    private conf: ConfigService
  ) { }

  private get eventId(): number | null {
    return this.eventService.currentEvent?.id ?? null;
  }

  private get headers(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  /** Fetch shift requests for a user with given status */
  updateShiftRequests(userId: number, status: string): void {
    if (!this.eventId) return;

    const url = `${this.conf.rootUrl}/shift/${this.eventId}/ShiftsByUser/status/${status}/user_id/${userId}`;
    this.http.get<any[]>(url, { headers: this.headers })
      .pipe(map(res => res.map(data => this.mapShift(data))))
      .subscribe(shifts => this.shiftRequests.next(shifts));
  }

  /** Fetch shifts by user with given status */
  updateShiftsByUser(userId: number, status: string): void {
    if (!this.eventId) return;

    const url = `${this.conf.rootUrl}/shift/${this.eventId}/ShiftsByUser/status/${status}/user_id/${userId}`;
    this.http.get<any[]>(url, { headers: this.headers })
      .pipe(map(res => res.map(data => this.mapShift(data))))
      .subscribe(shifts => this.shiftsByUser.next(shifts));
  }

  /** Get all users for the current event */
  getAllUsers(): Observable<User[]> {
    if (!this.eventId) return of([]);

    const url = `${this.conf.rootUrl}/event/${this.eventId}/allUsersByEvent`;
    return this.http.get<any[]>(url, { headers: this.headers })
      .pipe(map(res => res.map(u => new User(u.id, u.firstName, u.lastName))));
  }
  acceptRequest(activityId: number, categoryId: number, userId: number): void {
    const url = `${this.conf.rootUrl}/activity/${this.eventId}/confirmUser/shift_category_id/${categoryId}/activity_id/${activityId}/user_id/${userId}`;

    this.http.put(url, {}, { headers: this.headers }).subscribe(() => {
      this.updateShiftRequests(userId, "requested");
      this.updateShiftsByUser(userId, "confirmed");
    });
  }
  declineRequest(activityId: number, categoryId: number, userId: number): void {
    const url = `${this.conf.rootUrl}/activity/${this.eventId}/removeUser/shift_category_id/${categoryId}/activity_id/${activityId}`;

    this.http.put(url, {}, { headers: this.headers }).subscribe(() => {
      this.updateShiftRequests(userId, "requested");
      this.updateShiftsByUser(userId, "confirmed");
    });
  }


  /** Map API shift data to Shift model */
  private mapShift(data: any): Shift {
    const activities: Activity[] = data.activities.map((act: any) => {
      const user = new User(act.user.id, act.user.firstName, act.user.lastName);
      return new Activity(act.id, act.status, act.description, act.shift_id, act.user_id, user);
    });

    const shiftCategory = new ShiftCategory(
      data.shift_category.id,
      data.shift_category.name,
      data.shift_category.description,
      data.shift_category.event_id
    );

    return new Shift(data.id, data.startTime, data.endTime, data.shift_category_id, activities, shiftCategory);
  }
}
