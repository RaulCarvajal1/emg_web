import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { servicios } from 'src/app/interfaces/service.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';

@Component({
  selector: 'app-viewservicio',
  templateUrl: './viewservicio.component.html',
  styleUrls: ['./viewservicio.component.css']
})
export class ViewservicioComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router, 
              private serviciosService:ServiciosService, private userServices:UsuariosService, 
              private emgServices:EmgsService)
            { 
              this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
            }

  ngOnInit() {
    this.loadClients();
    this.getTecnicos();
  }

  servicio:servicios;
  status:String;
  tec:string;
  emg:string;
  proceso:boolean=false;
  stat0: boolean = false;
  btnen:boolean = true;
  msg:boolean = false;
  tecnicos: User[];
  clientes:User[];
  tec_id:string = "";
  //email data
  tec_email:string;
  tec_name:string;
  cli_email:string;
  cli_name:string;

  loadClients(){
    this.userServices.getAllClients().subscribe(
      res=>{
        this.clientes=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
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
        this.stat0 = true;
        break;
      case 1:
        this.status = 'Progamado';
        this.proceso = false;
        break;
      case 2:
        this.status = 'En proceso';
        this.proceso = false;
        break;
      case 3:
        this.status = 'Realizado';
        this.proceso = true;
        break;
    }
  }
  getTecnicos(){
    this.userServices.gettec().subscribe(
      res=>{
        this.tecnicos=res.detail;
      },err=>{
        console.error(err);
      }
    );
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
    this.router.navigateByUrl('/servicios');
  }
  enBut(){
    this.btnen=false;
  }
  asigTec(){
    this.serviciosService.asigTec(this.servicio._id,this.tec_id).subscribe(
      res => {
        console.log(res);
        this.msg = true;
        this.stat0 = false;
        this.getEmailData(this.servicio.client,this.tec_id);
        this.serviciosService.emailProgramar({
                                                "email_tecnico" : this.tec_email,
                                                "email_cliente" : this.cli_email,
                                                "nameTec" : this.tec_name,
                                                "nameCli" : this.cli_name,
                                                "date" : this.servicio.date,
                                                "id" : this.servicio._id.substring(this.servicio._id.length-10,this.servicio._id.length)
                                              }).subscribe(res=>{
                                                
                                              },err=>{

                                              });
        setTimeout(() => {
          this.regresar()
        }, 1000);
      },err => {
        console.error(err);
      }
    );
  }

  getEmailData(idc,idt){
    this.clientes.forEach(async e=>{
      if(idc==e._id){
        this.cli_email=e.info.email;
        this.cli_name=e.info.name;
      }
    });
    this.tecnicos.forEach(async e=>{
      if(idt==e._id){
        this.tec_email=e.info.email;
        this.tec_name=e.info.name;
      }
    });
  }
}
