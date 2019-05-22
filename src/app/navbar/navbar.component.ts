import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private auth:AuthService) { 
  }

  nombre:string="ejemplo";
  usu:boolean=false;
  equ:boolean=false;
  ser:boolean=false;
  mie:boolean=false;
  log:boolean=false;
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
      this.nombre=this.auth.getName();
      this.log=true;
      switch(this.auth.getRole()) { 
        case 0: { 
          this.usu=true;
          this.equ=true;
          this.ser=true;
          break; 
        } 
        case 1: {
          this.equ=true;
          this.ser=true;
          break; 
        }
        case 2: { 
          this.mie=true;
          break; 
        }
      } 
    }else{
      
    }
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
