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
import { AgreementsService } from 'src/app/services/agreements.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { empresa } from 'src/app/interfaces/clients.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Location } from "@angular/common";
import { AlertService } from 'src/app/services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-addservicio-tec',
  templateUrl: './addservicio-tec.component.html',
  styleUrls: ['./addservicio-tec.component.css']
})
export class AddservicioTecComponent implements OnInit {

    constructor(private fb:FormBuilder, private userServices:UsuariosService, 
              private emgServices:EmgsService, private serviciosService:ServiciosService,
              private router:Router, private auth: AuthService, private configServices:ConfigurationService,
              private agreementsServices:AgreementsService, private empresaService:EmpresasService,
              private plantsService: PlantasService, private location:Location,
              private alert:AlertService) 
  {
    this.serviciosForm = fb.group(
      {
        emg : ['',[Validators.required]],
        type : ['',[Validators.required]],
        date : ['',[Validators.required]],
        desc : ['',[Validators.required]],
        agreement : ['',[Validators.required]]
      }
    );
    this.fecExiste();
  }

  clientes:User[];
  tecnicos:User[];
  emgs:emgs[];
  emg_c_id: String;
  serviciosForm:FormGroup;
  minDate:String;
  tipos: any;
  fecAnt: boolean;

  contratos: Contrato[];

  empresas:empresa[];
  plants:Plant[];
  lines:Lines[];

  empresa: String ="";
  planta: String ="";
  linea: String ="";

  empresaB: Boolean = true;
  plantaB: Boolean = true;
  lineaB: Boolean = true;

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
    this.getContratos();
    this.getEmpresas();
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
    temp.requested_by = this.auth.getId();

    console.log(temp);
    this.serviciosService.save(temp).subscribe(
      res=>{
        this.getEmailData(temp.client,temp.tecnico);
        this.alert.success("Servicio programado correctamente, se enviaron correos a los actores implicados en este servicio. Seras redirigido en unos segundos");
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
        }, 3000);
      },err=>{
        this.alert.error("Error durante el registro.");
        setTimeout(() => {
          this.regresar();
        }, 3000);
      }
    );
  }
  getDate(date:any):string{
    var registro = moment(date.replace('T',' ').slice(0,16)).locale('es');
    let temp = registro.format('dddd, MMMM Do YYYY');
    return temp.charAt(0).toUpperCase()+temp.slice(1);
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
    this.location.back();
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
  getContratos(){
    this.agreementsServices.getContratosActivos().subscribe(
      res => {
        this.contratos = res.detail;
        if(res.detail.length == 0){
          this.alert.alert('No existe ningun contrato dentro del registro, porfavor primero generar un contrato para poder solicitar un servicio. Puedes crear un contrato en menú de Contratos > Nuevo Contrato.');
        }
      },err => {
        console.error(err);
      }
    )
  }
  getEmpresas(){
    this.empresaService.get().subscribe(
      res => {
        if(res.detail.length===0){
          this.empresaB =  true;
        }else{
          this.empresaB =  false;
          this.empresas = res.detail;
          this.plants = [];
          this.lines = [];
        }
        console.log(res);
      }, err => {
        console.error(err);
      }
    );
  }
  loadPlants(){
    this.plantsService. getAllPlantas(<string>this.empresa).subscribe(res=>{
      if(res.detail.length===0){
        this.plantaB =  true;
      }else{
        this.plantaB =  false;
        this.plants = res.detail;
        this.lines = [];
      }
      this.loadContratosId();
    },err=>{
      console.log(err);
    });
  }
  loadLines(){
    this.plants.forEach(el=>{
      if(el._id==this.planta){
        if(el.lines.length===0){
          this.lineaB = true;
        }else{
          this.lineaB = false;
          this.lines=el.lines;
        }
      }
    });
  }
  loadEmgsF(){
    this.emgServices.getByPlantAndLine(<string>this.planta,<string>this.linea).subscribe(
      res => {
        this.emgs = res.detail;
      }, err => {
        console.error(err)
      }
    );
  }
  loadContratosId(){
    this.agreementsServices.getContratosByClient(<string>this.empresa).subscribe(
    res => {
      this.contratos = res.detail;
    },err => {
      console.error(err);
    });
  }
}