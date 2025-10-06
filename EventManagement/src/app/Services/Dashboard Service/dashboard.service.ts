import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/Dashboard Component/user';

import { BehaviorSubject, Observable } from 'rxjs';
import { EventServiceService } from '../Event Service/event-service.service';
import { EventModel } from 'src/app/Object Models/EventModel';
import { Activity } from 'src/app/Object Models/Dashboard Component/activity';
import { AuthService } from '../Auth Service/auth.service';
import { ConfigService } from '../config.service';
import { Shift } from 'src/app/Object Models/Dashboard Component/shift';
import { ShiftCategory } from 'src/app/Object Models/Dashboard Component/shift-category';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  shiftsByUser: Subject<Shift[]> = new Subject<Shift[]>();
  shiftRequests: Subject<Shift[]> = new Subject<Shift[]>();

  //rootUrl: string = 'http://localhost:3000';
  userList: Subject<User[]> = new Subject<User[]>();

  //ventit23



  storedUser: User;

  constructor(private http: HttpClient, private eventService: EventServiceService, private authService: AuthService, private conf: ConfigService) {

    const stored = localStorage.getItem('selected-dashboard-user');

    this.storedUser = stored !== null ? JSON.parse(stored) : null;
  }



  updatePasswort(_pw: string) {


  }

  accReq(_actID: number, _catID: number, _userId: number) {
    //  /activity/:current_event_id/confirmUser/shift_category_id/:shift_category_id/activity_id/:activity_id/user_id/:user_id
    this.http.put(this.conf.rootUrl + "/activity/" + this.eventService.currentEvent.id + "/confirmUser/shift_category_id/" + _catID + "/activity_id/" + _actID + "/user_id/" + _userId, {}, this.authService.getAuthHeader())
      .subscribe(res => {
        console.log("Response: ", res)
        this.updateShiftReq(_userId, "requested");
        this.updateUserActivity(_userId, "confirmed");
      })
  }

  decReq(_actID: number, _catID: number, _userId: number) {
    // /activity/:current_event_id/removeUser/shift_category_id/:shift_category_id/activity_id/:activity_id
    this.http.put(this.conf.rootUrl + "/activity/" + this.eventService.currentEvent.id + "/removeUser/shift_category_id/" + _catID + "/activity_id/" + _actID, {}, this.authService.getAuthHeader())
      .subscribe(res => {
        console.log("Response: ", res)
        this.updateShiftReq(_userId, "requested");
        this.updateUserActivity(_userId, "confirmed");
      })

  }
  // /shift/:current_event_id/ShiftsByUser/status/:status/user_id/:user_id

  updateUserActivity(_userId: number, shiftStatus: string) {

    if (_userId) {
      this.eventService.getCurrentEvent().subscribe((currentEvent: EventModel) => {

        if (currentEvent) {
          this.http.get<any>(this.conf.rootUrl + '/shift/' + this.eventService.currentEvent.id + '/ShiftsByUser/status/' + shiftStatus + '/user_id/' + _userId, this.authService.getAuthHeader()).subscribe((res: any) => {

            const shifts: Shift[] = res.map((data: any) => {
              const activities: Activity[] = data.activities.map((act: any) => {
                const user = new User(
                  act.user.id,
                  act.user.firstName,
                  act.user.lastName
                );

                return new Activity(
                  act.id,
                  act.status,
                  act.description,
                  act.shift_id,
                  act.user_id,
                  user
                );
              });

              const shiftCategory = new ShiftCategory(
                data.shift_category.id,
                data.shift_category.name,
                data.shift_category.description,
                data.shift_category.event_id
              );

              return new Shift(
                data.id,
                data.startTime,
                data.endTime,
                data.shift_category_id,
                activities,
                shiftCategory
              );
            });
            console.log("HEREEE: ", shifts)
            this.shiftsByUser.next(shifts);

          })
        }
      })
    }






  }

  updateShiftReq(_userId: number, shiftStatus: string) {
    if (_userId) {
      this.eventService.getCurrentEvent().subscribe((currentEvent: EventModel) => {
        if (currentEvent) {
          const url = `${this.conf.rootUrl}/shift/${this.eventService.currentEvent.id}/ShiftsByUser/status/${shiftStatus}/user_id/${_userId}`;

          this.http.get<any[]>(url, this.authService.getAuthHeader()).subscribe((res: any[]) => {
            const shifts: Shift[] = res.map((data: any) => {
              const activities: Activity[] = data.activities.map((act: any) => {
                const user = new User(
                  act.user.id,
                  act.user.firstName,
                  act.user.lastName
                );

                return new Activity(
                  act.id,
                  act.status,
                  act.description,
                  act.shift_id,
                  act.user_id,
                  user
                );
              });

              const shiftCategory = new ShiftCategory(
                data.shift_category.id,
                data.shift_category.name,
                data.shift_category.description,
                data.shift_category.event_id
              );

              return new Shift(
                data.id,
                data.startTime,
                data.endTime,
                data.shift_category_id,
                activities,
                shiftCategory
              );
            });
            console.log("DATATATA; ", shifts)
            this.shiftRequests.next(shifts);
          });
        }
      });
    }
  }

  getAllUser() {

    return this.http.get(this.conf.rootUrl + '/event/' + this.eventService.currentEvent.id + '/allUsersByEvent', this.authService.getAuthHeader()).subscribe((res: any) => {
      const users: User[] = res.map((user: any) => new User(
        user.id,
        user.firstName,
        user.lastName,
        //user.email,
        //user.password

      ));
      this.userList.next(users);

    }

    );

  }
  // getShiftById(_shiftId: number): void {
  //   this.http.get<any>(
  //     `${this.conf.rootUrl}/shift/${this.eventService.currentEvent.id}/shift_id/${_shiftId}`,
  //     this.authService.getAuthHeader()
  //   ).subscribe((res: any) => {

  //     // Map activities
  //     const activities: Activity[] = res.activities.map((a: any) => {
  //       const user = a.user ? new User(
  //         a.user.id,
  //         a.user.firstName || '',
  //         a.user.lastName || '',
  //         a.user.email || '',
  //         a.user.username || ''
  //       ) : new User(-1, '', '', '', '');

  //       return new Activity(a.id, user, a.status);
  //     });

  //     // Convert start/end time strings into timestamps
  //     const startTime = new Date(res.startTime.replace(' ', 'T')).getTime();
  //     const endTime = new Date(res.endTime.replace(' ', 'T')).getTime();

  //     // Example isActive check: ends in the future
  //     const isActive = endTime > Date.now();

  //     const shift = new Shift(res.id, startTime, endTime, activities, isActive);

  //     // Do something with the shift object (e.g., push to a BehaviorSubject)
  //     //this.userList.next(shift);
  //     return shift;
  //   });
  // }






}
