import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { res } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http:HttpClient) { }

  //Fecha configurations
  getFec(){
    return this.http.get<res>('http://localhost:3033/config/getfech');
  }
  setFec(){
    return this.http.post<res>('http://localhost:3033/config/setfech',{});
  }
  changeFec(data){
    return this.http.put<res>('http://localhost:3033/config/changefech',data);
  }

  //Tipos de mantenimiento configurations
  getTipos(){
    return this.http.get<res>('http://localhost:3033/config/getst');
  }
  saveTipo(data){
    return this.http.post<res>('http://localhost:3033/config/savest',data);
  }
  deleteTipo(id){
    return this.http.delete<res>(`http://localhost:3033/config/delst/${id}`);
  }

}
