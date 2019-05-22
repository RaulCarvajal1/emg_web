import { Component, OnInit } from '@angular/core';
import { User } from "./../interfaces/user.interface";
import { UsuariosService } from "./../services/usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarios:UsuariosService) { }

  users:JSON[];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.usuarios.getAllUsers().subscribe(
    (data:JSON)=>{
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

}
