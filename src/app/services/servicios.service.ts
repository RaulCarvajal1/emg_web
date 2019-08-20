import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";
import { saveAs } from 'file-saver';
import { link } from './app.settings';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<resArray>(`http://${link}/service/getall`);
  }

  save(data:any){
    return this.http.post<res>(`http://${link}/service/create`,data);
  }

  getByTec(id:String){
    return this.http.get<resArray>(`http://${link}/service/getbytec/${id}`);
  }

  getByEmg(id:String){
    return this.http.get<resArray>(`http://${link}/service/getbyemg/${id}`);
  }
  
  getByClient(id:String){
    return this.http.get<resArray>(`http://${link}/service/getbyclient/${id}`);
  }
  
  getById(id:String){
    return this.http.get<res>(`http://${link}/service/getbyid/${id}`);
  }

  start(id:String){
    return this.http.put<res>(`http://${link}/service/start/${id}`,{});
  }

  finish(id:String,data:any){
    return this.http.put<res>(`http://${link}/service/finish/${id}`,data);
  }

  asigTec(id_s:String, id_t:String,date){///asigtec/:id_s/:id_t
    return this.http.patch<res>(`http://${link}/service/asigtec/${id_s}/${id_t}`,{"date" : date});
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

  //Send correos
  /*
  solicitar
  programar
  asignar
  */
  emailSolicitar(data:any){
    return this.http.post<res>(`http://${link}/service/emailsolicitarservicio`,data);
  }
  emailProgramar(data:any){
    return this.http.post<res>(`http://${link}/service/emailprogramarservicio`,data);
  }
  emailAsignar(data:any){
    return this.http.post<res>(`http://${link}/service/emailasignarservicio`,data);
  }
}
