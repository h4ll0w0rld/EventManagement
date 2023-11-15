import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any = {
    apiUrl: 'https://api.example.com',
    apiKey: 'your-api-key',
    id: 1
    // Other configuration values
  };

  get(_key: string): any {
    return this.config[_key];
  }
  getEventID(){
    return this.config.id
  }

  setEventId(_id:number){
    this.config.id = _id
  }
  set(_key: string, _value: any): void {
    this.config[_key] = _value;
  }
}
