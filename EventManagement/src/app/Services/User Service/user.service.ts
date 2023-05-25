import { Injectable } from '@angular/core';
import { User } from 'src/app/Object Models/user/shiftplanModel';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
}
