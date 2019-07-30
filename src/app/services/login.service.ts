import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { link } from './app.settings';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  login(user:string,pass:string){
    return this.http.post<JSON>(`http://${link}/user/login`, 
    {
      username: user,
      password: pass
    }, 
    this.httpOptions);
  }

}

