import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmgsService } from 'src/app/services/emgs.service';
import { User } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { emgs, Info } from 'src/app/interfaces/emg.interface';
import { Plant } from 'src/app/interfaces/plant.interface';

@Component({
  selector: 'app-viewemg',
  templateUrl: './viewemg.component.html',
  styleUrls: ['./viewemg.component.css']
})
export class ViewemgComponent implements OnInit, DoCheck {

  constructor(private activatedRoute:ActivatedRoute, 
              private emgService:EmgsService, 
              private userService:UsuariosService, 
              private plantasService:PlantasService, 
              private router:Router) 
  { 
    this.getEmg(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    
  }
  ngDoCheck(){
    
  }

  emg:emgs;

  modelo:string;
  tipo:string;
  descripcion:string;
  serie:string;
  
  cl:User;
  cliente:string;
  pl:Plant;
  planta:string;
  linea:string;

  loadStrings(){
    let info:Info=this.emg.info;
    this.modelo=info.model;
    this.tipo=info.type;
    this.descripcion=info.description;
    this.serie=info.serial;
  }

  getEmg(id:string){
    this.emgService.getById(id).subscribe(res=>{
      this.emg=res.detail;
      this.getClient();
    },req=>{
      console.log(req);
    });
  }
  getClient(){
    let usr:string=this.emg.client;
    this.userService.getUser(usr).subscribe(
      res=>{
        this.cl=res.detail;
        this.cliente=this.cl.info.name;
        this.getPlant();
      },
      err=>{
        console.log(err);
        return "Indefinido";
      }
    );
  }
  getPlant(){
    this.plantasService.getPlanta(this.emg.plant).subscribe(
      res=>{
        this.pl=res.detail;
        this.planta=this.pl.name;
        this.pl.lines.forEach(el=>{
          if(el._id==this.emg.line){
            this.linea=el.number+"";
          }
        });
        this.loadStrings();
      },
      err=>{
        console.log(err);
        return "Indefinido";
      }
    );
  }
  activado():string{
    if(!this.emg.active){
      return "Inactivo";
    }else{
      return "Activo";
    }
  }
  estatus():string{
    switch (this.emg.status) {
      case 0:
        return "En producción";
        break;
      case 1:
        return "En mantenimiento";
        break;
      case 2:
        return "En reparación";
        break;

      default:
        break;
    }
  }
  regresar(){
    this.router.navigateByUrl('equipos/equipos');
  }
  actDesStr():string{
    if(this.emg.active){
      return "Desactivar";
    }else{
      return "Activar";
    }
  }

  actDes(){
    this.emgService.actDes(<string>this.activatedRoute.snapshot.paramMap.get("id"),this.emg.active).subscribe(
      data=>{
        this.getEmg(<string>this.activatedRoute.snapshot.paramMap.get("id"));
      },err=>{
        console.log(err);
      });
  }

}
