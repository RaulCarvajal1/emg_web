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

  start(id:String){
    return this.http.put<res>('http://localhost:3033/service/start/'+id,{});
  }

  asigTec(id_s:String, id_t:String){///asigtec/:id_s/:id_t
    return this.http.patch<res>('http://localhost:3033/service/asigtec/'+id_s+"/"+id_t,{});
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
    return this.http.post<res>('http://localhost:3033/service/emailsolicitarservicio',data);
  }
  emailProgramar(data:any){
    return this.http.post<res>('http://localhost:3033/service/emailprogramarservicio',data);
  }
  emailAsignar(data:any){
    return this.http.post<res>('http://localhost:3033/service/emailasignarservicio',data);
  }
}
