import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';
import { AuthService } from '../Auth/auth-service.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  shiftsByUser: Subject<userActivity[]> = new Subject<userActivity[]>();

  rootUrl: string = 'http://85.215.56.234:3000';
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

  constructor(private http: HttpClient, private authService: AuthService) { 

    const stored = localStorage.getItem('selected-dashboard-user');
   
    this.storedUser = stored !== null ? JSON.parse(stored) : null;
  }

  ngOnInit() {

    /*
    const stored = localStorage.getItem('selected-dashboard-user');
    console.log(stored);
    this.storedUser = stored !== null ? JSON.parse(stored) : null;
    */
  }

  updatePasswort(_pw: string) {

    this.password = _pw;
  }




  updateUserActivity(_userId?: number) {

    if (_userId) {
      
      this.http.get<any>(this.rootUrl + '/shift/ShiftsByUser/user_id/' + _userId + '/event_id/1', this.options).subscribe((res: any) => {

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

    




  }

  getAllUser() {

    return this.http.get(this.rootUrl + '/user/all', this.options).subscribe((res: any) => {
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
