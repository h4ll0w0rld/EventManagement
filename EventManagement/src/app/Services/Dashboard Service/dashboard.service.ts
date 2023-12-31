import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';

import { BehaviorSubject } from 'rxjs';
import { EventServiceService } from '../Event Service/event-service.service';
import { EventModel } from 'src/app/Object Models/EventModel';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { AuthService } from '../Auth Service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  shiftsByUser: Subject<userActivity[]> = new Subject<userActivity[]>();
  shiftRequests: Subject<userActivity[]> = new Subject<userActivity[]>();

  rootUrl: string = 'http://localhost:3000';
  userList: Subject<User[]> = new Subject<User[]>();

  //ventit23

  username = 'projektle';
  password = "ventit23";
  encodedCredentials = btoa(`${this.username}:${this.password}`);
  headers = new HttpHeaders({
    'Authorization': 'Basic ' + this.encodedCredentials
  });
  options = { headers: this.headers };

  storedUser: User;

  constructor(private http: HttpClient, private eventService: EventServiceService, private authService: AuthService) {

    const stored = localStorage.getItem('selected-dashboard-user');

    this.storedUser = stored !== null ? JSON.parse(stored) : null;
  }



  updatePasswort(_pw: string) {

    this.password = _pw;
  }

  accReq(_act: Activity, _userID:number){
  //  /activity/:current_event_id/confirmUser/shift_category_id/:shift_category_id/activity_id/:activity_id/user_id/:user_id
    this.http.put("/activity/" + this.eventService.currentEvent.id + "/confirmUser/shift_category_id/" + this.eventService.currCat.id + "/activity_id/" + _act.uuid + "/user_id/" + _userID, {}, this.authService.getAuthHeader())
      .subscribe(res => {
        console.log("Response: ", res)
      })
  }

  decReq(){

  }


  updateUserActivity(_userId?: number) {

    if (_userId) {
      this.eventService.getCurrentEvent().subscribe((currentEvent: EventModel) => {

        if (currentEvent) {
          this.http.get<any>(this.rootUrl + '/shift/ShiftsByUser/user_id/' + _userId + '/event_id/' + currentEvent.id, this.options).subscribe((res: any) => {

            const userActivities: userActivity[] = res.map((data: any) => {
              return new userActivity(
                data.activities[0].user.firstName,
                data.shift_category.name,
                data.startTime,
                data.endTime
              );
            });

            this.shiftsByUser.next(userActivities);

          })
        }
      })
    }






  }

  getAllUser() {

    return this.http.get(this.rootUrl + '/user/all', this.options).subscribe((res: any) => {
      const users: User[] = res.map((user: any) => new User(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.password

      ));
      this.userList.next(users);

    }

    );

  }




}
