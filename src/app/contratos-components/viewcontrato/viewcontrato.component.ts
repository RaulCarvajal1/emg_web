import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { Location } from "@angular/common";

@Component({
  selector: 'app-viewcontrato',
  templateUrl: './viewcontrato.component.html',
  styleUrls: ['./viewcontrato.component.css']
})
export class ViewcontratoComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router, 
              private agreementsService:AgreementsService, private location:Location)
            { 
            }

  ngOnInit() {
    this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  contrato:Contrato;
  name: String;
  cliente: String;
  emgs: String[];
  desc: String;
  start: String;
  end: String;
  single: boolean;
  estatus: boolean;
  
  getServicio(id:string){
    this.agreementsService.getContratoById(id).subscribe(
      res=>{
        this.contrato=res.detail;
        console.log(res.detail);
        this.getStrings();
      },err=>{
        console.error(err);
      }
    );
  }
  getStrings(){
    this.name = this.contrato.name;
    this.cliente = this.contrato.client;
    this.emgs = this.contrato.emgs;
    //this.start = this.contrato.period.start;
    //this.end = this.contrato.period.end;
    //this.single = this.contrato.period.single;
    this.desc  = this.contrato.description;
    this.estatus  = this.contrato.status;
  }
  getStatus(s:boolean){
    if(s){
      return "Activo";
    }else{
      return "Vencido";
    }
  }
  getDateStatus(date:any):String{
    return date.slice(0,16).replace('T',' a las ');
  }
  regresar(){
    this.location.back();
  }
}
