import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UsuariosService } from "../../services/usuarios.service";
import { User } from "../../interfaces/user.interface";
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { AlertService } from 'src/app/services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, 
              private usuarios:UsuariosService, 
              private router:Router, private auth:AuthService,
              private location: Location,
              private alert: AlertService) 
  {
  }

  user:User;
  reg_by:User;
  reg_bystr:string;
  reg_date:string;
  load: boolean = false;
  usEx:Boolean = false;
  im:Boolean = false;

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    this.usuarios.getUser(<string>this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      (data)=>{
        this.user=data.detail;
        this.getName(this.user.meta.registred_by);
        this.getDate(this.user.meta.registred_date);
        this.iM();
        this.load = true;
      },
      (err)=>{
        console.log(err)
    });
  }
  nUser:string="";
  nName:string=""; 
  nEmail:string="";
  nPass:string="";
  getRol(r:number):string{
    switch (r) {
      case 0:
        return "Administrador"
        break;
      case 1:
        return "Técnico"
        break;
      case 2:
        return "Cliente"
        break;
    }
  }
  iM(){
    if(this.user._id==this.auth.getId()){
      this.im=true;
    }else{
      this.im=false;
    }
  }
  getStatus(s:number):string{
    if(s){
      return "Activo";
    }else{
      return "Inactivo";
    }
  }
  isActivatedStr(s:number):string{
    if(s){
      return "Desactivar";
    }else{
      return "Activar";
    }
  }
  regresar(){
    this.location.back();
  }
  updClick(){
    if(this.nUser==""){
      this.nUser=this.user.username;
    }
    if(this.nPass==""){
      this.nPass=this.user.password;
    }
    if(this.nName==""){
      this.nName=this.user.info.name;
    }
    if(this.nEmail==""){
      this.nEmail=this.user.info.email;
    }
    this.actualizar(this.nUser,this.nPass,this.nName,this.nEmail);
  }
  actualizar(u:string,p:string,n:string,e:string){  
    let uUsr:any={
      '_id' : this.user._id,
      'username' : u,
      'password' : p,
      'info' : {
        'name' : n,
        'email' : e
      }
    };
    this.alert.confirm(
      "¿Seguro que quiere actualizar el registro?",
      ()=>{
        this.load = false;
        this.usuarios.updateUser(uUsr).subscribe(
          data=>{
            this.loadUser();
            this.nName="";
            this.nEmail="";
            this.nUser="";
            this.load = true;
            this.alert.success("Actualizado");
          },err=>{
            console.log(err);
            this.alert.error("Ocurrio un error");
          }
        );
      },
      ()=>{
        this.alert.error("No se registraron cambios");
      }
    );
    
  }
  actDes(){
    this.alert.confirm('Al realizar esta acción alterará el inicio de sesíon al usuario.',
      ()=>{
        this.load = false;
        this.usuarios.actDes(<string>this.activatedRoute.snapshot.paramMap.get("id"),this.user.active).subscribe(
          data=>{
            this.loadUser();
            this.alert.success("Actualizado");
            this.load = true;
          },err=>{
            console.log(err);
            this.alert.error("Ocurrio un error");
          })
      },
      ()=>{this.alert.error("No se registraron cambios")}
    );
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
    this.reg_date =  this.reg_date.charAt(0).toUpperCase()+this.reg_date.slice(1);
  }
  enbuts():boolean{
    if(this.nUser!=""||this.nEmail!=""||this.nName!=""){
      return false;
    }
    return true;
  }
  goToMiCuenta(){
    this.router.navigateByUrl('micuenta');
  }
  existeUsuario(){
    this.usuarios.userExists(this.nUser).subscribe(
      res=>{
        if(res.detail!=null){
          this.usEx=true;
        }else{
          this.usEx=false;
        }
      },err=>{
        console.log(err);
      }
    );
  }
}
