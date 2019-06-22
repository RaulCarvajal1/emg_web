import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<resArray>('http://localhost:3033/service/getall');
  }

  save(data:any){
    return this.http.post<res>('http://localhost:3033/service/create',data);
  }

  getByTec(id:String){
    return this.http.get<resArray>('http://localhost:3033/service/getbytec/'+id);
  }

  getByEmg(id:String){
    return this.http.get<resArray>('http://localhost:3033/service/getbyemg/'+id);
  }

  getById(id:String){
    return this.http.get<res>('http://localhost:3033/service/getbyid/'+id);
  }

}
