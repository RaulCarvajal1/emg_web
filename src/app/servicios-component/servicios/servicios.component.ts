import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { EmgsService } from 'src/app/services/emgs.service';
import { emgs } from 'src/app/interfaces/emg.interface';
import { servicios } from 'src/app/interfaces/service.interface';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  constructor(private userServices:UsuariosService, private emgServices:EmgsService, private serviciosService:ServiciosService,
              private router:Router) { }

  tecnicos:User[];
  emgs:emgs[];
  servicios:servicios[];
  busqById:String="";
  id_tec:String="";
  id_emg:String="";

  ngOnInit() {
    this.loadTecnicos();
    this.loadEmgs();
    this.loadServices();
  }

  loadTecnicos(){
    this.userServices.gettec().subscribe(
      res=>{
        this.tecnicos=res.detail;
      },err=>{
        console.error(err);
      }
    );
  } 
  loadEmgs(){
    this.emgServices.getAll().subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.error(err);
      } 
    );
  }
  loadServices(){
    this.serviciosService.getAll().subscribe(
      res=>{
        this.servicios=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  getTecnico(id:string):string{
    if(id==null){
      return "Por asignar"
    }else{
      let n:User = this.tecnicos.find((tec)=>{
        return tec._id == id;
      });
      return n.info.name;
    }
  }
  getEmg(id:string):string{
    let n:emgs = this.emgs.find((tec)=>{
                    return tec._id == id;
                 });
    return n.info.name;
  }
   /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */
  getStatus(n:number):string{
    switch (n) {
      case 0:
        return "Solicitado (Asignar Tec)";
        break;
      case 1:
        return "Programado";
        break;
      case 2:
        return "En proceso";
        break;
      case 3:
        return "Realizado";
        break;
      default:
        break;
    }
  }
  getId(id:string):string{
    return id.substring(id.length-10,id.length);
  }
  getDate(date:string):string{
    return date.slice(0,16).replace('T',' a las ');
  }
  gotoNew(){
    this.router.navigateByUrl('servicios/nuevo');
  }
  viewService(id:String){
    this.router.navigateByUrl('servicios/'+id);
  }
  busquedaById(){
    this.id_emg="";
    this.id_tec="";
    if(this.busqById==""){
      this.loadServices();
    }else{
      const regex = new RegExp(this.busqById.toLowerCase());
      const temp: servicios[] = this.servicios;
      this.servicios = temp.filter(servicio => servicio._id.toLowerCase().match(regex));
    }
  }
  findByTec(){
    this.id_emg="";
    if(this.id_tec=="todos"){
      this.loadServices();
    }else{
      this.serviciosService.getByTec(this.id_tec).subscribe(
        res=>{
          this.servicios=res.detail;
        },err=>{
          console.error(err);
        }
      );
    }
  }
  findByEmg(){
    this.id_tec="";
    if(this.id_emg=="todos"){
      this.loadServices();
    }else{
      this.serviciosService.getByEmg(this.id_emg).subscribe(
        res=>{
          this.servicios=res.detail;
        },err=>{
          console.error(err);
        }
      );
    }
  }
}
