import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UsuariosService } from "../../services/usuarios.service";
import { User } from "../../interfaces/user.interface";


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, DoCheck {

  constructor(private activatedRoute: ActivatedRoute, 
              private usuarios:UsuariosService, 
              private router:Router) 
  { }

  user:User;
  reg_by:User;
  reg_bystr:string;
  reg_date:string;

  usEx:boolean=false;

  ngOnInit() {
    this.loadUser();
  }
  ngDoCheck(){
    this.getName(this.user.meta.registred_by);
    this.getDate(this.user.meta.registred_date);
  }

  loadUser(){
    this.usuarios.getUser(<string>this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      (data)=>{
        this.user=data.detail;
      },
      (err)=>{
        console.log(err)
    });
  }
  nUser:string="";
  nName:string=""; 
  nEmail:string="";
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
    this.router.navigateByUrl('usuarios');
  }
  updClick(){
    if(this.nUser==""){
      this.nUser=this.user.username;
    }
    if(this.nName==""){
      this.nName=this.user.info.name;
    }
    if(this.nEmail==""){
      this.nEmail=this.user.info.email;
    }
    this.actualizar(this.nUser,this.nName,this.nEmail);
  }
  actualizar(u:string,n:string,e:string){  
    let uUsr:any={
      '_id' : this.user._id,
      'username' : u,
      'info' : {
        'name' : n,
        'email' : e
      }
    };

    this.usuarios.updateUser(uUsr).subscribe(
      data=>{
        this.loadUser();
        this.nName="";
        this.nEmail="";
        this.nUser="";
      },err=>{
        console.log(err);
      });
  }
  actDes(){
    this.usuarios.actDes(<string>this.activatedRoute.snapshot.paramMap.get("id"),this.user.active).subscribe(
      data=>{
        this.loadUser();
      },err=>{
        console.log(err);
      });
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
    this.reg_date = ut.slice(0, 10);
  }
  enbuts():boolean{
    if(this.nUser!=""||this.nEmail!=""||this.nName!=""){
      return false;
    }
    return true;
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
