import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EventModel } from 'src/app/Object Models/EventModel';
import { ConfigService } from '../config.service';


@Injectable({
  providedIn: 'root'
})
export class EventhubService {

  
  allEvents: EventModel[] = []
 

  constructor(private http: HttpClient, private conf: ConfigService) {


  }


  updateAllEvents() {

    this.http.get(this.conf.rootUrl + '/event/all', this.conf.getAuthHeader()).subscribe((res: any) => {
      let events: EventModel[] = res;
      this.allEvents = [...events]

    }
    );
  }

  addEvent(_event: EventModel) {
    console.log("Date", _event.startDate.toString())
    this.http.post(this.conf.rootUrl + '/event/add', {
      "name": _event.name,
      "description": _event.description,
      "startDate": this.formatTime(_event.startDate),
      "endDate": this.formatTime(_event.endDate),
      "location": _event.location

    }, this.conf.getAuthHeader()).subscribe((res: any) => {
      this.updateAllEvents();
     
    })
  }

  delEvent(){

  }


  //Formating time for addEvent
  formatTime(_date:Date) {
    const year = _date.getFullYear();
    const month = String(_date.getMonth() + 1).padStart(2, '0');
    const day = String(_date.getDate()).padStart(2, '0');
    const hours = String(_date.getHours()).padStart(2, '0');
    const minutes = String(_date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }


 
}
