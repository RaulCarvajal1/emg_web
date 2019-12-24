import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-addcontratos',
  templateUrl: './addcontratos.component.html',
  styleUrls: ['./addcontratos.component.css']
})
export class AddcontratosComponent implements OnInit {

  constructor(private fb:FormBuilder, private userServices:UsuariosService, 
              private emgServices:EmgsService, private agreementService:AgreementsService,
              private router:Router, private location:Location) 
              {
                this.contratoForm = fb.group(
                  {
                    name : ['',[Validators.required]],
                    description : ['',[Validators.required]],
                    start : [null,[]],
                    end : [null,[]],
                    single : [false,[]],
                    client : ['',[Validators.required]],
                    emgs : ['',[Validators.required]]
                  }
                );
              }

  clientes:User[];
  emgs:emgs[];
  emg_c_id: String;
  contratoForm:FormGroup;
  msg:boolean=false;
  msgErr:boolean=false;

  ngOnInit() {
    this.loadEmgs();
    this.loadClients();
  }

  loadClients(){
    this.userServices.getAllClients().subscribe(
      res=>{
        this.clientes=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  loadEmgs(){
    this.emgServices.getAll().subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */
  save(){
    let tempc = this.contratoForm.value;
    const temp = {
      'client' : tempc.client,//Names para ahorrar tiempo
      'description' : tempc.description,
      'emgsNames' : tempc.emgs,//Names para ahorrar tiempo
      'name' : tempc.name,
      'period' : {
        'start' : tempc.start,
        'end' : tempc.end,
        'single' : tempc.single
      }
    };
    console.log(temp); 
    this.agreementService.saveContrato(tempc).subscribe(
       res=>{
        this.msg=true
        setTimeout(() => {
          this.regresar();
        }, 1500);
      },err=>{
        console.log(err);
        this.msgErr=true
        setTimeout(() => {
          this.regresar();
        }, 1500);
      }
    );
  }

  regresar(){
    this.location.back();
  }

}