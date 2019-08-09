import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-addservicio-tec',
  templateUrl: './addservicio-tec.component.html',
  styleUrls: ['./addservicio-tec.component.css']
})
export class AddservicioTecComponent implements OnInit {

    constructor(private fb:FormBuilder, private userServices:UsuariosService, 
              private emgServices:EmgsService, private serviciosService:ServiciosService,
              private router:Router, private auth: AuthService, private configServices:ConfigurationService) 
  {
    this.serviciosForm = fb.group(
      {
        emg : ['',[Validators.required]],
        type : ['',[Validators.required]],
        date : ['',[Validators.required]],
        desc : ['',[Validators.required]],
      }
    );
    this.fecExiste();
  }

  clientes:User[];
  tecnicos:User[];
  emgs:emgs[];
  emg_c_id: String;
  serviciosForm:FormGroup;
  msg:boolean=false;
  msgErr:boolean=false;
  minDate:String;
  tipos: any;
  fecAnt: boolean;

  //email data
  tec_email:string;
  tec_name:string;
  cli_email:string;
  cli_name:string;

  ngOnInit() {
    this.loadTecnicos();
    this.loadEmgs();
    this.loadClients();
    this.getTipos();
  }
  getTipos(){
    this.configServices.getTipos().subscribe(
      res => {
        this.tipos = res.detail;
      },err => {
        console.log(err);
      }
    );
  }
  fecExiste(){
    this.configServices.getFec().subscribe(
      res => {
        console.log(res.detail.value)
        if(res.detail===null){
          this.configServices.setFec().subscribe(res=>{console.log(res)},err=>{});
          this.getMinDate(false);
        }else{
          this.getMinDate(<boolean>res.detail.value);
        }
      },err => {
        console.log(err);
      }
    )
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
  loadTecnicos(){
    this.userServices.gettec().subscribe(
      res=>{
        this.tecnicos=res.detail;
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
  getClientId(){
    let temp = this.serviciosForm.value.emg;
    this.emgs.forEach(emg => {
      if(emg._id==temp){
        this.emg_c_id=emg.client;
      }
    });
  }
   /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */
  save(){
    this.getClientId();
    let temp = this.serviciosForm.value;
    temp.status = 1;
    temp.tecnico = this.auth.getId();
    temp.client =  this.emg_c_id;
    console.log(temp);
    this.serviciosService.save(temp).subscribe(
      res=>{
        this.getEmailData(temp.client,temp.tecnico);
        this.msg=true
        this.serviciosService.emailProgramar({
                                              "email_tecnico" : this.tec_email,
                                              "email_cliente" : this.cli_email,
                                              "nameTec" : this.tec_name,
                                              "nameCli" : this.cli_name,
                                              "date" : this.getDate(temp.date),
                                              "id" : res.detail._id.substring(res.detail._id.length-10,res.detail._id.length)
                                            }).subscribe(res=>{
                                              console.log(res);
                                            },err=>{
                                              console.error(err);
                                            });
        setTimeout(() => {
          this.regresar();
        }, 1500);
      },err=>{
        this.msgErr=true
        setTimeout(() => {
          this.regresar();
        }, 1500);
      }
    );
  }
  getDate(date:any):string{
    return date.slice(0,16).replace('T',' a las ');
  }
  getEmailData(idc,idt){
    this.clientes.forEach(async e=>{
      if(idc==e._id){
        this.cli_email=e.info.email;
        this.cli_name=e.info.name;
      }
    });
    this.tecnicos.forEach(async e=>{
      if(idt==e._id){
        this.tec_email=e.info.email;
        this.tec_name=e.info.name;
      }
    });
  }

  regresar(){
    this.router.navigateByUrl('/misservicios-tec');
  }
  getMinDate(fa){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if(fa){
      this.minDate='';
    }else{
      if(month < 10){
        this.minDate = `${year}-0${month}-${day}T00:00`;
      }else{
        this.minDate = `${year}-${month}-${day}T00:00`;
      }
    }
  }
}