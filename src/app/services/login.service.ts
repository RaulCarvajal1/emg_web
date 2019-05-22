import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

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
    return this.http.post<JSON>('http://localhost:3033/user/login', 
    {
      username: user,
      password: pass
    }, 
    this.httpOptions);
  }

}

