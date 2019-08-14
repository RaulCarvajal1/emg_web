import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { EmpresasService } from 'src/app/services/empresas.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private auth:AuthService, private empresaService: EmpresasService) { 
  }

  nombre:string="";
  role:string="";
  log:boolean=false;
  adm:boolean=false;
  tec:boolean=false;
  cli:boolean=false;
  /*
    Si es administrador
    Usuarios|Equipos|Servicios
    Si es tecnico
     Y tiene privilegios
    
    Si es cliente
     - Mis equipos
  */
  ngOnInit(){
    if(this.auth.isLoged()){
      this.nombre=' - '+this.auth.getName().split(' ')[0];
      this.log=true;
      switch(this.auth.getRole()) { 
        case 0: { 
          this.adm = true;
          this.role = "(Administrador)";
          break;
        } 
        case 1: {
          this.tec = true;
          this.role = "(Técnico)";
          break;
        }
        case 2: {
          this.cli = true;
          this.role = "(Cliente)";     
          this.getEmpresa();    
          break;
        }
      } 
    }else{
      this.closeSesion();
    }
  }

  getEmpresa(){
    this.empresaService.getid(this.auth.getEmpresaId()).subscribe(
      res => {
        this.nombre = this.nombre+`(${res.detail.name})`; 
      },err => {
        console.error(err);
      }
    );
  }

  havePermisions():JSON{
    return this.auth.getPermissions();
  }

  routerTo(r:string="inicio"){
    this.router.navigateByUrl(r);
  }

  closeSesion():void{
    this.auth.closeSession();
    this.router.navigate(['login']);
  }

}
