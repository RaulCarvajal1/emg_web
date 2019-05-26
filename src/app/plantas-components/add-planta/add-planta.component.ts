import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from "./../../services/usuarios.service";
import { User } from 'src/app/interfaces/user.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-planta',
  templateUrl: './add-planta.component.html',
  styleUrls: ['./add-planta.component.css']
})
export class AddPlantaComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private usuarios:UsuariosService, private plantas:PlantasService, private auth:AuthService) { }

  ngOnInit() {
    this.id_c=this.activatedRoute.snapshot.paramMap.get("id");
    this.getName(this.id_c);
  }

  id_c:string="";

  reg_bystr="";
  reg_by:User;
  nName:string="";
  nCode:string="";
  neName:string="";
  nEmail:string="";
  nPhone:string="";

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
  regresar(){
    this.router.navigateByUrl('equipos/plantas');
  }
  enbuts():boolean{
    if(this.nName!=""||this.nCode!=""||this.neName!=""||this.nEmail!=""){
      return false;
    }else{
      return true;
    }
  }
  crearClick(){
    this.actualizar(this.nName,this.nCode,this.neName,this.nEmail,this.nPhone);
  }
  actualizar(n:string,c:string,ne:string,e:string,p:string){
    let nPlant:any={
      'client' : this.id_c,
      'name' : n,
      'code' : c,
      'boss' : {
        'name' : ne,
        'email' : e,
        'phone' : p
      },
      "meta":{
        "registred_by" : this.auth.getId()
      }
    };
    this.plantas.crear(nPlant).subscribe(
      res=>{
        //console.log(res);
        this.regresar();
      },err=>{
        console.log(err);
      }
    );
  }

}
