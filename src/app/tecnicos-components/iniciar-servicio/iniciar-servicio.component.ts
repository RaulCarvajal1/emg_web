import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { servicios } from 'src/app/interfaces/service.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';

@Component({
  selector: 'app-iniciar-servicio',
  templateUrl: './iniciar-servicio.component.html',
  styleUrls: ['./iniciar-servicio.component.css']
})
export class IniciarServicioComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router, 
              private serviciosService:ServiciosService, private userServices:UsuariosService, 
              private emgServices:EmgsService)
            { 
              this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
            }

  ngOnInit() {
  }

  servicio:servicios;
  status:String;
  tec:string;
  emg:string;
  proceso:boolean=false;
  stat0:boolean = true;
  iniciando:boolean=false;

  getServicio(id:string){
    this.serviciosService.getById(id).subscribe(
      res=>{
        console.log(res);
        this.servicio=res.detail;
        this.conditonials(this.servicio.status);
        this.getTec();
        this.getEmg();
      },err=>{
        console.error(err);
      }
    );
  }
  /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */
  conditonials(n:number){
    switch (n) {
      case 0:
        this.status = 'Solicitado por cliente (Falta asignar tecnico)';
        this.proceso = false;
        break;
      case 1:
        this.status = 'Progamado';
        this.proceso = false;
        this.stat0 = false;
        break;
      case 2:
        this.status = 'En proceso';
        this.proceso = false;
        this.stat0 = true;
        break;
      case 3:
        this.status = 'Realizado';
        this.proceso = true;
        this.stat0 = true;
        break;
    }
  }
  getTec(){
    this.userServices.getUser(<any>this.servicio.tecnico).subscribe(
      res=>{
        let temp:User=res.detail;
        this.tec=temp.info.name;
      },err=>{
        console.error(err);
      }
    );
  }
  getEmg(){
    this.emgServices.getById(<any>this.servicio.emg).subscribe(
      res=>{
        console.log(res);
        let temp:emgs=res.detail;
        this.emg=temp.info.name;
      },err=>{
        console.error(err);
      }
    );
  }
  getId(id:string):string{
    return id.substring(id.length-10,id.length);
  }
  getDate(date:any):string{
    return date.substring(0,10);
  }
  getPdf(){
    let data: any = {
      template: { "shortid" : "HJlwC8WhkH"  },
      data : {id : this.servicio._id.substring(0,10),
              emg : this.emg,
              tec : this.tec,
              type : this.servicio.type,
              desc : this.servicio.desc,
              status : this.status,
              date : this.getDate(this.servicio.date),
              start : '',
              finish : '',
              observ : '',
              signature : ''
            },
      options : { 'timeout': 60000 }
    };
    this.serviciosService.getPdf(data);
  }
  regresar(){
    this.router.navigateByUrl('misservicios-tec');
  }

  iniciarServicio(){
    this.serviciosService.start(this.servicio._id).subscribe(
      res=>{
        console.log(res);
        this.iniciando = true;
        setTimeout(() => {
          this.regresar();
        }, 1000);
      },err=>{
        console.log(err);
      }
    )
  }
}
