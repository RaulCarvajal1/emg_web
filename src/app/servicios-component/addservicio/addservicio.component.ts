import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-addservicio',
  templateUrl: './addservicio.component.html',
  styleUrls: ['./addservicio.component.css']
})
export class AddservicioComponent implements OnInit {

  constructor(private fb:FormBuilder, private userServices:UsuariosService, 
              private emgServices:EmgsService, private serviciosService:ServiciosService,
              private router:Router) 
              {
                this.serviciosForm = fb.group(
                  {
                    emg : ['',[Validators.required]],
                    tecnico : ['',[Validators.required]],
                    type : ['',[Validators.required]],
                    date : ['',[Validators.required]],
                    desc : ['',[Validators.required]],
                  }
                );
              }

  tecnicos:User[];
  emgs:emgs[];
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
  save(){
    let temp = this.serviciosForm.value;
    temp.status = 0;
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
    this.router.navigateByUrl('/servicios');
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
