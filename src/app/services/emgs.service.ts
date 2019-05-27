import { Injectable } from '@angular/core';
import { res, resArray } from "./../interfaces/response.interface";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmgsService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<resArray>('http://127.0.0.1:3033/emg/getall');
  }
  getByClient(id:string){
    return this.http.get<resArray>('http://127.0.0.1:3033/emg/getbyclient/'+id);
  }
  getByPlantAndLine(id_p:string, id_l:string){
    return this.http.get<resArray>('http://127.0.0.1:3033/emg/getbyplantandline/'+id_p+'/'+id_l);
  }
  create(nuevo:JSON){
    return this.http.post<res>('http://127.0.0.1:3033/emg/create',nuevo);
  }
  genEmg(id:string){
    return this.http.put<res>('http://127.0.0.1:3033/emg/genqr/'+id,{});
  }
  getById(id:string){
    return this.http.get<res>('http://127.0.0.1:3033/emg/getbyid/'+id);
  }

}
