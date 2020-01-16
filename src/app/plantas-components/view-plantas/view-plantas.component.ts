import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { PlantasService } from "./../../services/plantas.service";
import { UsuariosService } from "./../../services/usuarios.service";
import { Plant } from "./../../interfaces/plant.interface";
import { User } from 'src/app/interfaces/user.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-view-plantas',
  templateUrl: './view-plantas.component.html',
  styleUrls: ['./view-plantas.component.css']
})
export class ViewPlantasComponent implements OnInit {

  constructor(
              private activatedRoute:ActivatedRoute, 
              private router:Router, 
              private plantas:PlantasService, 
              private usuarios:UsuariosService,
              private empresas:EmpresasService,
              private location: Location,
              private alert: AlertService) { 
    this.id=this.activatedRoute.snapshot.paramMap.get("id")
  }
  id:string;
  ngOnInit() {
    this.getPlanta();
  }

  reg_by:User;
  reg_bystr:string="";
  reg_date:string="";
  planta:Plant;
  empresa: String = "";

  nName:string="";
  nCode:string="";
  neName:string="";
  nEmail:string="";
  nPhone:string="";

  actualizado:boolean=false;
  load: boolean = true;

  getPlanta(){
    this.plantas.getPlanta(this.id).subscribe(
      res=>{
        this.planta=res.detail;
        this.getEmpresa();
        this.getName(this.planta.meta.registred_by);
        this.getDate(this.planta.meta.registred_date);
        this.load = false;

      },err=>{
        console.error(err);
      }
    );
  }
  getEmpresa(){
    this.empresas.getid(this.planta.client).subscribe(
      res => {
        this.empresa = res.detail.name;
        console.log(res);
      },err => {
        console.error(err);
      }
    );
  }
  enbuts():boolean{
    if(this.nName!=""||this.nCode!=""||this.neName!=""||this.nEmail!=""){
      return false;
    }else{
      return true;
    }
  }
  regresar(){
    this.location.back();
  }
  getName(id:any){
    this.usuarios.getUser(id).subscribe(
      res=>{
        this.reg_by=res.detail;
        this.reg_bystr = this.reg_by.info.name;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  getDate(ut:string){
    var registro = moment(ut.replace('T',' ').slice(0,16)).locale('es');
    this.reg_date = registro.format('dddd, MMMM Do YYYY');
    this.reg_date =  this.reg_date.charAt(0).toUpperCase()+this.reg_date.slice(1).replace('º','');
  }
  updClick(){
    if(this.nName==""){
      this.nName=this.planta.name;
    }
    if(this.nCode==""){
      this.nCode=this.planta.code;
    }
    if(this.neName==""){
      this.neName=this.planta.boss.name;
    }
    if(this.nEmail==""){
      this.nEmail=this.planta.boss.email;
    }
    if(this.nPhone==""){
      this.nPhone=this.planta.boss.phone;
    }
    this.actualizar(this.nName,this.nCode,this.neName,this.nEmail,this.nPhone);
  }
  actualizar(n:string,c:string,ne:string,e:string,p:string){
    let nPlant:any={
      '_id' : this.id,
      'name' : n,
      'code' : c,
      'boss' : {
        'name' : ne,
        'email' : e,
        'phone' : p
      }
    };
    this.alert.confirm("¿Actualizar el registro?",
      ()=>{
        this.load = true;
        this.plantas.updatePlanta(nPlant).subscribe(
          res=>{
            this.getPlanta();
            this.nName="";
            this.nCode="";
            this.neName="";
            this.nEmail="";
            this.nPhone="";
            this.alert.success("Planta actualizada con éxito!");
            this.load = false;
          },err=>{
            console.log(err);
            this.alert.error("Error durante la actualización");
          }
        );
      },
      ()=>{this.alert.error("Sin cambios en el registro")}
    );
    
  }
}
