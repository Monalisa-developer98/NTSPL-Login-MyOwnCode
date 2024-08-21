import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private apiUrl = 'http://localhost:6798/auth';

  constructor(private http: HttpClient) { }

  addUsers(userData: any): Observable<any> {
    const urlStr = `${this.apiUrl}/signup`;
    return this.http.post(urlStr, userData);  // http.post has a payload (e.g., userData)
  }

  login(userData: any): Observable<any> {
    const urlStr = `${this.apiUrl}/login`;
    return this.http.post(urlStr, userData);
  }

  sendOTP(email: string): Observable<any> {
    const urlStr = `${this.apiUrl}/send-otp`;
    return this.http.post(urlStr, { email });
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    const urlStr = `${this.apiUrl}/verify-otp`;
    return this.http.post(urlStr, { email, otp });
  }

  resendOTP(email: string): Observable<any> {
    const urlStr = `${this.apiUrl}/send-otp`;
    return this.http.post(urlStr, { email });
  }

  resetPassword(email: string, password: string, otp: string, confirmPassword: string): Observable<any> {
    const body = { email, password, otp, nwpassword: confirmPassword };
    return this.http.post(`${this.apiUrl}/reset-password`, body);
  }

}