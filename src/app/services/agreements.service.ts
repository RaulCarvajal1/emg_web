import { Injectable } from '@angular/core';
import { link } from './app.settings';
import { HttpClient } from '@angular/common/http';
import { res, resArray } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class AgreementsService {

  constructor(private http: HttpClient) { }

  saveContrato(data: any){
    return this.http.post<res>(`http://${link}/agreements/savecontrato`,data);
  }

  getContratoById(id:string){
    return this.http.get<res>(`http://${link}/agreements/getcontratobyid/${id}`);
  }

  getContratoByClient(id:string){
    return this.http.get<res>(`http://${link}/agreements/getcontratobyclient/${id}`);
  }

  getContratos(){
    return this.http.get<resArray>(`http://${link}/agreements/getcontratos`);
  }

  addEmg(id:string, data: any){
    return this.http.put<res>(`http://${link}/agreements/addemg/${id}`,data);
  }
}
