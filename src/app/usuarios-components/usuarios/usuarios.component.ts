import { Component, OnInit } from '@angular/core';
import { User } from "../../interfaces/user.interface";
import { UsuariosService } from "../../services/usuarios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarios:UsuariosService, private router:Router) { }

  users:User[];
  busq:string;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.usuarios.getAllUsers().subscribe(
    (data)=>{
      this.users=data.detail;
    },
    (err)=>{
      console.log(err)
    });
  }
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
  usuarioDet(id:string){
    this.router.navigateByUrl('usuarios/'+id);
  }
  goNewuser(){
    this.router.navigateByUrl('usuarios/nuevo');
  }

  busqueda(){
    if(this.busq==""){
      this.loadUsers();
    }else{
      var regex = new RegExp(this.busq.toLowerCase());
      let temp:User[]=this.users;
      this.users=temp.filter(pln=> pln.info.name.toLowerCase().match(regex))
    }
  }
}
