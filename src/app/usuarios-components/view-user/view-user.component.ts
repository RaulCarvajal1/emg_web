import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UsuariosService } from "../../services/usuarios.service";
import { User } from "../../interfaces/user.interface";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, 
              private usuarios:UsuariosService, 
              private router:Router, private auth:AuthService) 
  {
  }

  user:User;
  reg_by:User;
  reg_bystr:string;
  reg_date:string;

  usEx:Boolean = false;
  actualizado:Boolean = false;
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
    this.router.navigateByUrl('usuarios');
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

    this.usuarios.updateUser(uUsr).subscribe(
      data=>{
        this.actualizado=true;
        setTimeout(() => {
          this.loadUser();
          this.nName="";
          this.nEmail="";
          this.nUser="";
          this.actualizado=false;  
        }, 1500);
      },err=>{
        console.log(err);
      });
  }
  actDes(){
    this.usuarios.actDes(<string>this.activatedRoute.snapshot.paramMap.get("id"),this.user.active).subscribe(
      data=>{
        this.actualizado=true;
        setTimeout(() => {
          this.loadUser();
          this.actualizado=false;  
        }, 1500);
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
