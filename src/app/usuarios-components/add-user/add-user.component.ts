import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "./../../interfaces/user.interface";
import { UsuariosService } from "./../../services/usuarios.service";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private router:Router, private usuarios:UsuariosService, private auth:AuthService) { }

  ngOnInit() {
  }

  selectedOption: string;
  printedOption: string;
  options = [
    { name: "1. Administrador"},
    { name: "2. Técnico"},
    { name: "3. Cliente"}
  ]

  user:User;
  u:string="";
  p:string="";
  n:string="";
  e:string="";
  r:number=-1;
  rol:string="";



  regresar():void{
    this.router.navigateByUrl('usuarios');
  }
  genUsuCon():void{
    if(this.existeUsuario(this.n.toLowerCase().replace(' ','').slice(0,6))){
      this.u=this.n.toLowerCase().replace(' ','').slice(0,6)+"1503";
    }else{
      this.u=this.n.toLowerCase().replace(' ','').slice(0,6);
    }
    this.p=this.u;
  }
  getRole() {
    this.r=parseInt(this.rol.slice(0,1))-1;
  }
  guardarUsuario(){
    this.getRole();
    console.log({
                "info" :{
                    "name" : this.n,
                    "email" : this.e
                },
                "permissions" : {
                    "emg" :  true,
                    "tecnicos" : true,
                    "clientes" : true
                },
                "meta" : {
                    "registred_by" : this.auth.getId()
                },
                "username" : this.u,
                "password" : this.p,
                "role" : this.r
            });

    this.usuarios.newUser({
                              "info" :{
                                  "name" : this.n,
                                  "email" : this.e
                              },
                              "permissions" : {
                                  "emg" :  true,
                                  "tecnicos" : true,
                                  "clientes" : true
                              },
                              "meta" : {
                                  "registred_by" : this.auth.getId()
                              },
                              "username" : this.u,
                              "password" : this.p,
                              "role" : this.r
                          })
                          .subscribe(
                              res=>{
                                console.log(res);
                                this.regresar();
                              },
                              err=>{
                                console.log(err);
                              }
                            );
  }
  enbuts():boolean{
    if(this.u!=""&&this.p!=""&&this.n!=""&&this.e!=""&&this.rol!=""){
      return false;
    }
    return true;
  }
  enbutsGen():boolean{
    if(this.n!=""&&this.e!=""&&this.rol!=""){
      return false;
    }
    return true;
  }
  existeUsuario(u:string):any{
    this.usuarios.userExists(u).subscribe(
      res=>{
        if(res.detail!=null){
          return true;
        }else{
          return false;
        }
      },err=>{
        console.log(err);
      }
    );
  }
}
