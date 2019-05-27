import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { res, resArray } from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(private http:HttpClient) { }

  getAllPlantas(id:string){
    return this.http.get<resArray>("http://127.0.0.1:3033/plant/getplants/"+id);
  }

  getAll(){
    return this.http.get<resArray>("http://127.0.0.1:3033/plant/getall");
  }

  getPlanta(id:string){
    return this.http.get<res>("http://127.0.0.1:3033/plant/getplant/"+id)
  }

  updatePlanta(plant:JSON){
    return this.http.put<res>("http://127.0.0.1:3033/plant/update",
      plant
    );
  }

  crear(plant:JSON){
    return this.http.post<res>("http://127.0.0.1:3033/plant/create",
      plant
    );
  }

  addLinea(line:JSON, id_p:string){
    return this.http.put<res>("http://127.0.0.1:3033/plant/addline/"+id_p,
      line
    );
  }
}