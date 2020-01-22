import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AgreementsService } from 'src/app/services/agreements.service';
import { AlertService } from 'src/app/services/alert.service';
import { servicios } from 'src/app/interfaces/service.interface';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { Contrato } from 'src/app/interfaces/agreement.interface';

@Component({
  selector: 'app-editarservicio',
  templateUrl: './editarservicio.component.html',
  styleUrls: ['./editarservicio.component.css']
})
export class EditarservicioComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute, 
    private serviciosService:ServiciosService,
    private fb:FormBuilder, 
    private userServices:UsuariosService, 
    private emgServices:EmgsService, 
    private configServices:ConfigurationService,
    private agreementsServices:AgreementsService,
    private location: Location,
    private alert:AlertService) 
    { 
      this.getTecnicos();
      this.getEmgs();
      this.getTipos();
      this.getContratos();
    }
 
  //*ngIf="servicio.status == 1 || servicio.status == 3"


  servicio:servicios;
  load: boolean = true;
  servicioProgramado: FormGroup;

  tecnicos:User[];
  emgs:emgs[];
  contratos: Contrato[];
  tipos: any;

  minDate: string = "0000-01-01T00:00";
  maxDate: string =  "3000-12-311T00:00"

  ngOnInit() {
    //this.getServicio(this.activatedRoute.snapshot.paramMap.get("id"));
  }

  initProgramarForm(){
    this.servicioProgramado = this.fb.group(
      {
        emg : [this.servicio.emg,[Validators.required]],
        tecnico : [this.servicio.tecnico,[Validators.required]],
        type : [this.servicio.type,[Validators.required]],
        date : [this.servicio.date.slice(0,16),[Validators.required]],
        desc : [this.servicio.desc,[Validators.required]],
        agreement : [this.servicio.agreement,[Validators.required]],
        id : [this.servicio._id,[]]
      }
    );
    this.load = false;
  }

  getServicio(id:string){
    this.serviciosService.getById(id).subscribe(
      res=>{
        this.servicio=res.detail;
        if(this.servicio.status == 1){
          //load programado form
          //this.initProgramarForm(this.servicio);
        }else if(this.servicio.status == 3){
          //load finalizado form
        }
      },err=>{
        console.error(err);
      }
    );
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
  getTecnicos(){
    this.userServices.gettec().subscribe(
      res=>{
        this.tecnicos=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }
  getContratos(){
    this.agreementsServices.getContratosActivos().subscribe(
      res => {
        this.contratos = res.detail;
        if(res.detail.length == 0){
          this.alert.alert('No existe ningun contrato dentro del registro, por favor primero generar un contrato para poder solicitar un servicio. Puedes crear un contrato en menú de Contratos > Nuevo Contrato.');
        }
      },err => {
        console.error(err);
      }
    )
  }
  getEmgs(){
    this.emgServices.getAll().subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.error(err);
      }
    );
  }

  save(){

  }

}
