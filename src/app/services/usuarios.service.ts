import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<res>('http://localhost:3033/user/getall');
  }

  getUser(id:string){
    return this.http.get<res>('http://localhost:3033/user/getbyid/'+id);
  }

  updateUser(user:JSON){
    return this.http.put<res>('http://localhost:3033/user/update',
      user
    );
  }

  actDes(id:string,stat:boolean){
    if(stat){
      return this.http.patch<res>('http://localhost:3033/user/disable/'+id, {'Content-Type': 'application/json'});
    }else{
      return this.http.patch<res>('http://localhost:3033/user/enable/'+id, {'Content-Type': 'application/json'});
    }
  }

  newUser(user){
    return this.http.post<res>('http://localhost:3033/user/create/', user);
  }

  sendMailNewUser(data){
    return this.http.post<res>('http://localhost:3033/user/newUserEmail',data);
  }

  userExists(u:String){
    return this.http.get<res>('http://localhost:3033/user/existe/'+u);
  }

  getAllClients(){
    return this.http.get<resArray>("http://127.0.0.1:3033/user/getclients");
  }
  gettec(){
    return this.http.get<resArray>("http://127.0.0.1:3033/user/gettec");
  }

  updatePass(user:JSON){
    return this.http.put<res>('http://localhost:3033/user/updatepass',
      user
    );
  }
}
