import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<JSON>('http://localhost:3033/user/getall');
  }
}
