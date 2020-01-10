import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { Location } from "@angular/common";
import * as moment from 'moment';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { servicios } from 'src/app/interfaces/service.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { ServiciosService } from 'src/app/services/servicios.service';
 
@Component({
  selector: 'app-viewcontrato',
  templateUrl: './viewcontrato.component.html',
  styleUrls: ['./viewcontrato.component.css']
})
export class ViewcontratoComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, 
              private router:Router, 
              private agreementsService:AgreementsService, 
              private location:Location,
              private userServices:UsuariosService, 
              private emgServices:EmgsService, 
              private serviciosService:ServiciosService)
            { 
            }
 
  ngOnInit() {
    this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
    this.loadTecnicos();
    this.loadEmgs();
    this.loadServices();
  }

  contrato:Contrato;
  name: String;
  cliente: String;
  desc: String;
  start: String;
  end: String;
  single: boolean;
  estatus: boolean;
  load: boolean = true;


  tecnicos:User[];
  emgs:emgs[];
  servicios:servicios[];

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
    this.serviciosService.getByContrato(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      res=>{
        this.servicios=res.detail;
        setTimeout(() => {
          this.load = false;
        }, 2000);
      },err=>{
        console.error(err);
      }
    );
  }
  getScore(score:Number, status :Number){
    if(status != 3){
      return 'No Calificado';
    }else{
      switch (score) {
        case 0:
          return 'Mala';
        case 1:
          return 'Buena';
        case 2:
          return 'Excelente';
      }
    }
  }
  getStatusService(n:number):string{
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
  getId(id:string):string{
    return id.substring(id.length-10,id.length);
  }
  viewService(id:String){
    this.router.navigateByUrl('servicios/'+id);
  }

  getServicio(id:string){
    this.agreementsService.getContratoById(id).subscribe(
      res=>{
        this.contrato=res.detail;
        this.getStrings();
      },err=>{
        console.error(err);
      }
    );
  }
  getStrings(){
    this.name = this.contrato.name;
    this.cliente = this.contrato.client;
    //this.start = this.contrato.period.start;
    //this.end = this.contrato.period.end;
    //this.single = this.contrato.period.single;
    this.desc  = this.contrato.description;
    this.estatus  = this.contrato.status;
  }
  getStatus(s:boolean){
    if(s){
      return "Activo";
    }else{
      return "Vencido";
    }
  }
  getDateStatus(date:any):String{
    return date.slice(0,16).replace('T',' a las ');
  }
  regresar(){
    this.location.back();
  }
  getDate(date:string):string{
    var registro = moment(date.replace('T',' ').slice(0,16)).locale('es');
    let temp = registro.format('dddd, MMMM Do YYYY');
    return temp.charAt(0).toUpperCase()+temp.slice(1);
  }
}
