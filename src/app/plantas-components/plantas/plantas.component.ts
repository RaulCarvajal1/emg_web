import { Component, OnInit } from '@angular/core';
import { Plant } from "../../interfaces/plant.interface";
import { User } from "../../interfaces/user.interface";
import { PlantasService } from "../../services/plantas.service";
import { UsuariosService } from "../../services/usuarios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.css']
})
export class PlantasComponent implements OnInit {

  constructor(private router:Router, private plantas:PlantasService, private usuarios:UsuariosService) { }

  ngOnInit() {
    this.getClients();
  }

  planta:Plant[];
  clns:User[];
  clientes:User[];
  load:boolean=false;
  id_cliente;

  loadPlants(){
    this.plantas.getAllPlantas(this.id_cliente).subscribe(
    (data)=>{
      this.planta=data.detail;
      this.load=true;
    },
    (err)=>{
      console.log(err)
    });
  }

  vacio():boolean{
    if(this.planta.length==0){
      return true;
    }else{
      return false;
    }
  }

  getClients():any{
    this.usuarios.getAllClients().subscribe(
      res=>{
        console.log(res);
        this.clientes=res.detail;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }

  plantDet(id:string){
    this.router.navigateByUrl('equipos/plantas/'+id);
  }

 
}
