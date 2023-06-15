import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  shiftsByUser: Subject<userActivity[]> = new Subject<userActivity[]>();

  rootUrl: string = 'http://localhost:3000';
  userList: Subject<User[]> = new Subject<User[]>();

  constructor(private http: HttpClient) { }




  updateUserActivity(_userId: number = 1) {

    this.http.get<any>(this.rootUrl + '/shift/ShiftsByUser/user_id/' + _userId + '/event_id/1').subscribe((res: any) => {

      const userActivities: userActivity[] = res.map((data: any) => {
        return new userActivity(
          data.activities[0].user.firstName,
          data.shift_category.name,
          data.startTime,
          data.endTime
        );
      });
      console.log(userActivities)
      this.shiftsByUser.next(userActivities);

    })




  }

  getAllUser() {

    return this.http.get(this.rootUrl + '/user/all').subscribe((res: any) => {
      const users: User[] = res.map((user: any) => new User(
        user.id,
        user.firstName,
        user.lastName,

      ));
      this.userList.next(users);
    }

    );

  }




}
