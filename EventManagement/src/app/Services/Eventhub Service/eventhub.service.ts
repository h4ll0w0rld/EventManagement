import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth-service.service';
import { EventModel } from 'src/app/Object Models/EventModel';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class EventhubService {

  username = 'projektle';
  password = "ventit23";
  allEvents: EventModel[] = []
  encodedCredentials = btoa(`${this.username}:${this.password}`);
  headers = new HttpHeaders({
    'Authorization': 'Basic ' + this.encodedCredentials
  });
  options = { headers: this.headers };
  //rootUrl = 'http://85.215.56.234:3000';
  rootUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {


  }


  updateAllUser() {

    this.http.get(this.rootUrl + '/event/all', this.options).subscribe((res: any) => {
      let events: EventModel[] = res;
      this.allEvents = [...events]

    }
    );
  }

  addEvent(_event: EventModel) {
    console.log("Date", _event.startDate.toString())
    this.http.post(this.rootUrl + '/event/add', {
      "name": _event.name,
      "description": _event.description,
      "startDate": this.formatTime(_event.startDate),
      "endDate": this.formatTime(_event.endDate),
      "location": _event.location

    }, this.options).subscribe((res: any) => {
      console.log("res", res)
    })
  }

  delEvent(){

  }

  formatTime(_date:Date) {
    const year = _date.getFullYear();
    const month = String(_date.getMonth() + 1).padStart(2, '0');
    const day = String(_date.getDate()).padStart(2, '0');
    const hours = String(_date.getHours()).padStart(2, '0');
    const minutes = String(_date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
