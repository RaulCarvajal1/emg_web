import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";
import { saveAs } from 'file-saver';


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
  
  getByClient(id:String){
    return this.http.get<resArray>('http://localhost:3033/service/getbyclient/'+id);
  }

  getById(id:String){
    return this.http.get<res>('http://localhost:3033/service/getbyid/'+id);
  }
  getPdf(data:any){
    var mediaType = 'application/pdf';
    this.http.post('http://127.0.0.1:8080/api/report', data, { responseType: 'blob' }).subscribe(
        (response) => {
            var blob = new Blob([response], { type: mediaType });
            saveAs(blob, 'reporte_servicio.pdf');
        },
        e => { console.error(e) }
    );
  }

}
