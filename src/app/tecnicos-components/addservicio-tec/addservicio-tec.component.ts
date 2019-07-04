import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addservicio-tec',
  templateUrl: './addservicio-tec.component.html',
  styleUrls: ['./addservicio-tec.component.css']
})
export class AddservicioTecComponent implements OnInit {

    constructor(private fb:FormBuilder, private userServices:UsuariosService, 
              private emgServices:EmgsService, private serviciosService:ServiciosService,
              private router:Router, private auth: AuthService) 
  {
    this.serviciosForm = fb.group(
      {
        emg : ['',[Validators.required]],
        type : ['',[Validators.required]],
        date : ['',[Validators.required]],
        desc : ['',[Validators.required]],
      }
    );
  }

  tecnicos:User[];
  emgs:emgs[];
  emg_c_id: String;
  serviciosForm:FormGroup;
  msg:boolean=false;
  msgErr:boolean=false;
  minDate:String;


  ngOnInit() {
    this.loadTecnicos();
    this.loadEmgs();
    this.getMinDate();
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
        this.msg=true
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
  regresar(){
    this.router.navigateByUrl('/misservicios-tec');
  }
  getMinDate(){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if(month < 10){
      this.minDate = `${year}-0${month}-${day}`;
    }else{
      this.minDate = `${year}-${month}-${day}`;
    }
  }
}