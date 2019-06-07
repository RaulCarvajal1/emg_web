import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { PlantasService } from "./../../services/plantas.service";
import { UsuariosService } from "./../../services/usuarios.service";
import { Plant } from "./../../interfaces/plant.interface";
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-view-plantas',
  templateUrl: './view-plantas.component.html',
  styleUrls: ['./view-plantas.component.css']
})
export class ViewPlantasComponent implements OnInit, DoCheck {

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private plantas:PlantasService, private usuarios:UsuariosService) { 
    this.id=this.activatedRoute.snapshot.paramMap.get("id")
  }
  id:string;
  ngOnInit() {
    this.getPlanta();
  } 
  ngDoCheck(){
    this.getName(this.planta.meta.registred_by);
    this.getDate(this.planta.meta.registred_date);
  }

  reg_by:User;
  reg_bystr:string="";
  reg_date:string="";
  planta:Plant;

  nName:string="";
  nCode:string="";
  neName:string="";
  nEmail:string="";
  nPhone:string="";

  actualizado:boolean=false;

  getPlanta(){
    this.plantas.getPlanta(this.id).subscribe(
      res=>{
        this.planta=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  enbuts():boolean{
    if(this.nName!=""||this.nCode!=""||this.neName!=""||this.nEmail!=""){
      return false;
    }else{
      return true;
    }
  }
  regresar(){
    this.router.navigateByUrl('equipos/plantas');
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
  updClick(){
    if(this.nName==""){
      this.nName=this.planta.name;
    }
    if(this.nCode==""){
      this.nCode=this.planta.code;
    }
    if(this.neName==""){
      this.neName=this.planta.boss.name;
    }
    if(this.nEmail==""){
      this.nEmail=this.planta.boss.email;
    }
    if(this.nPhone==""){
      this.nPhone=this.planta.boss.phone;
    }
    this.actualizar(this.nName,this.nCode,this.neName,this.nEmail,this.nPhone);
  }
  actualizar(n:string,c:string,ne:string,e:string,p:string){
    let nPlant:any={
      '_id' : this.id,
      'name' : n,
      'code' : c,
      'boss' : {
        'name' : ne,
        'email' : e,
        'phone' : p
      }
    };
    this.plantas.updatePlanta(nPlant).subscribe(
      res=>{
        this.actualizado=true;
        setTimeout(() => {
          this.getPlanta();
          this.nName="";
          this.nCode="";
          this.neName="";
          this.nEmail="";
          this.nPhone="";
          this.actualizado=false;  
        }, 1500);
      },err=>{
        console.log(err);
      }
    );
  }
}
