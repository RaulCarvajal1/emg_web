import { Injectable } from '@angular/core';
import { res, resArray } from "./../interfaces/response.interface";
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

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
  getByPlant(id:string){
    return this.http.get<resArray>('http://127.0.0.1:3033/emg/getbyplant/'+id);
  }
  getByLine(id:string){
    return this.http.get<resArray>('http://127.0.0.1:3033/emg/getbyline/'+id);
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
  actDes(id:string,stat:boolean){
    if(stat){
      return this.http.patch<res>('http://localhost:3033/emg/disable/'+id, {'Content-Type': 'application/json'});
    }else{
      return this.http.patch<res>('http://localhost:3033/emg/enable/'+id, {'Content-Type': 'application/json'});
    }
  }

  getPdf(data:any){
    var mediaType = 'application/pdf';
    this.http.post('http://127.0.0.1:8080/api/report', data, { responseType: 'blob' }).subscribe(
        (response) => {
            var blob = new Blob([response], { type: mediaType });
            saveAs(blob, 'ficha_emg.pdf');
        },
        e => { console.error(e) }
    );
  }

}
