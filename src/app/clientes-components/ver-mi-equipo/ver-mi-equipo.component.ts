import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmgsService } from 'src/app/services/emgs.service';
import { User } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { emgs, Info } from 'src/app/interfaces/emg.interface';
import { Plant } from 'src/app/interfaces/plant.interface';

@Component({
  selector: 'app-ver-mi-equipo',
  templateUrl: './ver-mi-equipo.component.html',
  styleUrls: ['./ver-mi-equipo.component.css']
})
export class VerMiEquipoComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, 
              private emgService:EmgsService, 
              private userService:UsuariosService, 
              private plantasService:PlantasService, 
              private router:Router) {
    this.getEmg(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {

  }

  emg:emgs;

  nombre:string;
  modelo:string;
  tipo:string;
  descripcion:string;
  serie:string;
  cod_pro:string;
  actualizado:boolean=false;

  cl:User;
  cliente:string;
  pl:Plant;
  planta:string;
  linea:string;

  loadStrings(){
    let info:Info=this.emg.info;
    this.nombre=info.name;
    this.modelo=info.model;
    this.tipo=info.type;
    this.descripcion=info.description;
    this.serie=info.serial;
    this.cod_pro = this.emg.cod_pro;
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
          this.linea=el.name+"";
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
    this.router.navigateByUrl('misequipos');
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
      this.actualizado=true;
      setTimeout(()=>{
        this.getEmg(<string>this.activatedRoute.snapshot.paramMap.get("id"));
        this.actualizado = false;
      },1500);
    },err=>{
      console.log(err);
    });
  }
  getPdf(){
    let data:any={
    template: { "shortid" : "rkgmBHwjyH"  },
    data : {
        id: this.emg._id.substring(0,10),
        nombre: this.nombre,
        cliente:this.cliente,
        planta:this.planta,
        linea:this.linea,
        estatus:this.estatus(),
        modelo:this.modelo,
        tipo:this.tipo,
        desc:this.descripcion,
        serie:this.serie,
        qr:this.emg.qr,
        cod_pro : this.cod_pro
      },
      options : { "timeout": 60000 }
    };
    this.emgService.getPdf(data);
    }
}
