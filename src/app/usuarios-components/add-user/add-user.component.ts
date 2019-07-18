import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "./../../interfaces/user.interface";
import { UsuariosService } from "./../../services/usuarios.service";
import { AuthService } from "./../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user', 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private router:Router, private usuarios:UsuariosService, private auth:AuthService, public fb: FormBuilder) {
    this.userForm=fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {
  }

  userForm:FormGroup;

  options = [
    { name: "Administrador", id : 0},
    { name: "Técnico", id : 1},
    { name: "Cliente", id : 2}];
  user:User;
  u:string;
  msg:boolean=false;
  msgErr:boolean=false;

  regresar():void{
    this.router.navigateByUrl('usuarios');
  }
  genUsuCon(){
    this.u=""+(Math.floor(Math.random()*1000000));
  }
  getRol(id){
    this.options.forEach(e=>{
      if(e.id=id){
        return e.name;
      }
    })
  }
  guardarUsuario(){
    let values=this.userForm.value;
    this.usuarios.newUser({"info" :{
                                  "name" : values.name,
                                  "email" : values.email
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
                              "password" : this.u,
                              "role" : values.role
                          }).subscribe(
                              res=>{
                                this.msg=true;
                                this.sendMail({
                                                "email" : res.detail.info.email,
                                                "username" : this.u,
                                                "password" : this.u,
                                                "name" : values.name,
                                                "id" : res.detail._id
                                              });
                                setTimeout(() => {
                                  this.regresar();
                                }, 2000);
                              },
                              err=>{
                                console.log(err);
                                this.msgErr=true;
                              }
                            );
  }
  sendMail(data){
    this.usuarios.sendMailNewUser(data).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    });
  }
}
