import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }


  authenticate() {
    const credentials = 'username:password'; // Replace with your credentials
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(credentials)}`,
    });

    return this.http.get(`${this.apiUrl}/your-endpoint`, { headers });
  }
}
