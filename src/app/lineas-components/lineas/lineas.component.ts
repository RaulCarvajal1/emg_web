import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Plant } from 'src/app/interfaces/plant.interface';
import { Router } from "@angular/router";
import { PlantasService } from 'src/app/services/plantas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {
  constructor(private router:Router, private plantas:PlantasService, private usuarios:UsuariosService) { }

  ngOnInit() {
    this.getClients();
  }

  planta:Plant[];
  clns:User[];
  clientes:User[];
  planta_sel:Plant;
  load:boolean=false;
  id_cliente;
  id_planta;

  sinPlantas:boolean=false;
  sinLineas:boolean=false;

  loadPlants(){
    this.plantas.getAllPlantas(this.id_cliente).subscribe(
    (data)=>{
      this.planta=data.detail;
      if(this.planta.length==0){this.sinPlantas=true;}else{this.sinPlantas=false;}
    },
    (err)=>{
      console.log(err)
    });
  }
  vacio():boolean{
    if(this.planta_sel.lines.length==0){
      return true;
    }else{
      return false;
    }
  }
  getClients():any{
    this.usuarios.getAllClients().subscribe(
      res=>{
        this.clientes=res.detail;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  plantDet(id:string){
    this.router.navigateByUrl('equipos/lineas/'+this.id_planta+"/"+id);
  }
  goNewLine(){
    this.router.navigateByUrl('equipos/lineas/nueva/'+this.id_planta);
  }
  loadLineas(){
    this.planta.forEach(el=>{
      if(el._id==this.id_planta){
        this.planta_sel=el;
      }
      this.load=true;
    });
  }
}
 