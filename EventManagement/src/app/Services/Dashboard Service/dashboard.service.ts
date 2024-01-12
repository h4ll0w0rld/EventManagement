import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';

import { BehaviorSubject, Observable } from 'rxjs';
import { EventServiceService } from '../Event Service/event-service.service';
import { EventModel } from 'src/app/Object Models/EventModel';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { AuthService } from '../Auth Service/auth.service';
import { ConfigService } from '../config.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  shiftsByUser: Subject<userActivity[]> = new Subject<userActivity[]>();
  shiftRequests: Subject<userActivity[]> = new Subject<userActivity[]>();

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

  accReq(_actID: number,  _catID:number, _userId:number){
  //  /activity/:current_event_id/confirmUser/shift_category_id/:shift_category_id/activity_id/:activity_id/user_id/:user_id
    this.http.put(this.conf.rootUrl + "/activity/" + this.eventService.currentEvent.id + "/confirmUser/shift_category_id/" + _catID + "/activity_id/" + _actID + "/user_id/" + _userId, {}, this.authService.getAuthHeader())
      .subscribe(res => {
        console.log("Response: ", res)
        this.updateShiftReq(_userId, "requested");
        this.updateUserActivity(_userId, "confirmed");
      })
  }

  decReq(_actID: number,  _catID:number, _userId:number){
    // /activity/:current_event_id/removeUser/shift_category_id/:shift_category_id/activity_id/:activity_id
    this.http.put(this.conf.rootUrl + "/activity/" + this.eventService.currentEvent.id + "/removeUser/shift_category_id/" + _catID + "/activity_id/" + _actID, {}, this.authService.getAuthHeader())
    .subscribe(res => {
      console.log("Response: ", res)
      this.updateShiftReq(_userId, "requested");
      this.updateUserActivity(_userId, "confirmed");
    })

  }
  // /shift/:current_event_id/ShiftsByUser/status/:status/user_id/:user_id

  updateUserActivity(_userId: number, shiftStatus:string) {

    if (_userId) {
      this.eventService.getCurrentEvent().subscribe((currentEvent: EventModel) => {

        if (currentEvent) {
          this.http.get<any>(this.conf.rootUrl + '/shift/' + this.eventService.currentEvent.id +'/ShiftsByUser/status/' + shiftStatus + '/user_id/' + _userId, this.authService.getAuthHeader()).subscribe((res: any) => {

            const userActivities: userActivity[] = res.map((data: any) => {
              return new userActivity(
                data.activities[0].user.firstName,
                data.shift_category.name,
                data.startTime,
                data.endTime,
                data.shift_category.id,
                data.activities[0].id,
                data.activities[0].user.id,
                
              );
            });

            this.shiftsByUser.next(userActivities);

          })
        }
      })
    }






  }

  updateShiftReq(_userId: number, shiftStatus:string) {

    if (_userId) {
      this.eventService.getCurrentEvent().subscribe((currentEvent: EventModel) => {

        if (currentEvent) {
          this.http.get<any>(this.conf.rootUrl + '/shift/' + this.eventService.currentEvent.id +'/ShiftsByUser/status/' + shiftStatus + '/user_id/' + _userId, this.authService.getAuthHeader()).subscribe((res: any) => {

            const userActivities: userActivity[] = res.map((data: any) => {
              console.log(data)
              return new userActivity(
                data.activities[0].user.firstName,
                data.shift_category.name,
                data.startTime,
                data.endTime,
                data.shift_category.id,
                data.activities[0].id,
                data.activities[0].user.id,

              );
            });

            this.shiftRequests.next(userActivities);

          })
        }
      })
    }
    


  }

  getAllUser() {

    return this.http.get(this.conf.rootUrl + '/event/'+ this.eventService.currentEvent.id + '/allUsersByEvent', this.authService.getAuthHeader()).subscribe((res: any) => {
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
