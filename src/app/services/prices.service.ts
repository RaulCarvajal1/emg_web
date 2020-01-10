import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { res } from '../interfaces/response.interface';
import { link } from './app.settings';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(private http:HttpClient) { }

  getIva(){
    return this.http.get<res>(`http://${link}/iva/getiva`);
  }

  saveIva(data:any){
    return this.http.post<res>(`http://${link}/iva/saveiva`,data);
  }

  getUnitprice(){
    return this.http.get<res>(`http://${link}/unitprice/getunitprice`);
  }

  saveUnitprice(data:any){
    return this.http.post<res>(`http://${link}/unitprice/saveunitprice`,data);
  }
}
