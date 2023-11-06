import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth-service.service';
import { EventModel } from 'src/app/Object Models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventhubService {

  username = 'projektle';
  password = localStorage.getItem('authent');
  allEvents: EventModel[] = []
  encodedCredentials = btoa(`${this.username}:${this.password}`);
  headers = new HttpHeaders({
    'Authorization': 'Basic ' + this.encodedCredentials
  });
  options = { headers: this.headers };
  rootUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {


  }


  updateAllUser() {

    this.http.get(this.rootUrl + '/event/all', this.options).subscribe((res: any) => {
      let events:EventModel[] = res;
      this.allEvents = [...events]

    }

    );



  }
}
