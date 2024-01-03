import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { EventModel } from 'src/app/Object Models/EventModel';
import { ConfigService } from '../config.service';
import { AuthService } from '../Auth Service/auth.service';
import { User } from 'src/app/Object Models/user/user';


@Injectable({
  providedIn: 'root'
})
export class EventhubService implements OnInit {

  loggedInUser: User = new User(-1, "", "", "", "");
  allEvents: EventModel[] = []


  constructor(private https: HttpClient, private conf: ConfigService, private authService: AuthService) { }


  getUsersEvents() {

    if (this.loggedInUser.uuid == -1) {
      const userFromStorage = localStorage.getItem("user");
      console.log(userFromStorage)
           // Check if the retrieved value is not null and then assign it to loggedInUser
      if (userFromStorage !== null) {
        this.loggedInUser = JSON.parse(userFromStorage);
      }
    }

      this.https.get(this.conf.rootUrl + '/user/eventsByUser/user_id/' + this.loggedInUser.uuid, this.authService.getAuthHeader()).subscribe((res: any) => {
        let events: EventModel[] = res;
        this.allEvents = [...events]

      }, err => {

        console.log(err)
        if (err.status === 401) this.authService.refreshAccess();

      }
      );
    }
  

    addEvent(_event: EventModel) {
      console.log("Date", _event.startDate.toString())
      this.https.post(this.conf.rootUrl + '/event/add', {
        "name": _event.name,
        "description": _event.description,
        "startDate": this.formatTime(_event.startDate),
        "endDate": this.formatTime(_event.endDate),
        "location": _event.location

      }, this.authService.getAuthHeader()).subscribe((res: any) => {
        this.getUsersEvents();

      })
    }

    delEvent(){

    }


    //Formating time for addEvent
    formatTime(_date: Date) {
      const year = _date.getFullYear();
      const month = String(_date.getMonth() + 1).padStart(2, '0');
      const day = String(_date.getDate()).padStart(2, '0');
      const hours = String(_date.getHours()).padStart(2, '0');
      const minutes = String(_date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    ngOnInit(){
      this.authService.loggedInUser$.subscribe(user => {
        this.loggedInUser = user;
      })
    }


  }
