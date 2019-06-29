import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router, private userService:UsuariosService) { 
  }

  pform: Boolean = false;
  aform: Boolean = false;
  botCC: Boolean = true;
  msgEq: Boolean = false;
  msgVal: Boolean = false;
  msgAct: Boolean = false;
  existeUser: Boolean = false;

  _id:String;
  user:String;
  pass:String;
  name:String;
  email:String;
  role:String;


  nuser:String = "";
  nname:String = "";
  nemail:String = "";
  antigua:String = "";
  nueva:String = "";

  ngOnInit() {
    this.getStrings();
  }
  showPForm(){
    this.aform = false;
    this.pform = !this.pform;
  }
  showAForm(){
    this.pform = false;
    this.aform = !this.aform;
  }
  regresar(){
    this.router.navigateByUrl('inicio');
  }
  getStrings(){
    this._id =  this.auth.getId();
    this.user =  this.auth.getUsername();
    this.pass = this.auth.getPassword();
    this.name = this.auth.getName();
    this.email = this.auth.getEmail();
    this.role = this.getRole(this.auth.getRole());
  }
  getRole(r:Number):String{
    switch (r) {
      case 0:
        return "Administrador";
      case 1:
        return "Técnico";
      case 2:
        return "Cliente";
      default:
        break;
    }
  }
  updatePass(){
    let temp: any={
      _id : this._id,
      password : this.nueva
    }
    this.userService.updatePass(temp).subscribe(
      res=>{
        this.msgAct = true;
        setTimeout(() => {
          this.auth.closeSession();
          this.router.navigate(['login']);
        }, 1000);
      },err=>{
        console.log(err);
      }
    );
  }
  updClick(){
    if(this.nuser==""){
      this.nuser=this.user;
    }
    if(this.nname==""){
      this.nname=this.name;
    }
    if(this.nemail==""){
      this.nemail=this.email;
    }
    this.updateData(this.nuser,this.nname,this.nemail);
  }
  updateData(u,n,e){
    let temp: any={
      _id : this._id,
      username : u,
      info : {
        name : n,
        email : e
      }
    };
    this.userService.updateUser(temp).subscribe(
      res=>{
        this.msgAct = true;
        setTimeout(() => {
          this.auth.closeSession();
          this.router.navigate(['login']);
        }, 1000);
      },err=>{
        console.log(err);
      }
    );
    
  }
  existeUsuario(){
    this.userService.userExists(this.nuser).subscribe(
      res=>{
        console.log(res);
        if(res.detail != null){
          this.existeUser = true;
        }else{
          this.existeUser = false;
        }
      },err=>{
        console.error(err);
      }
    );
  }
  pasEquals(){
    if(this.antigua != this.pass){
      this.msgEq = true;
    }else{
      this.msgEq = false;
    }
  }
  pasVal(){
    if(this.nueva.length <= 5){
      this.msgVal = true;
    }else{
      this.msgVal = false;
      this.botCC = false;
    }
  }
}
