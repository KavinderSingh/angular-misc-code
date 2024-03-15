import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUtilsService {

  public get accessToken(): string {
    return localStorage.getItem("token") ?? "";
  }

  public getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.appendAuthHeader(headers);
  }

  public appendAuthHeader(headers: HttpHeaders) {
    const token = this.accessToken;

    if(token == "") {
      return headers;
    }
    const tokenValue = `Bearer ${token}`;
    return headers.set('Authorization', tokenValue);
  }
}
