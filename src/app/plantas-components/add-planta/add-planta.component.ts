import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from "./../../services/usuarios.service";
import { User } from 'src/app/interfaces/user.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

 
@Component({
  selector: 'app-add-planta',
  templateUrl: './add-planta.component.html',
  styleUrls: ['./add-planta.component.css']
})
export class AddPlantaComponent implements OnInit {

  constructor(public fb: FormBuilder, private router:Router, private usuarios:UsuariosService, private plantas:PlantasService, private auth:AuthService)
  { 
    this.plantaForm=fb.group({
      client:['', [Validators.required]],
      name:['', [Validators.required]],
      code:['', [Validators.required]],
      ename:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required, Validators.minLength(10)]],
    });
  }
 
  ngOnInit() {
    this.getNameC();
  }

  clients:User[];
  plantaForm:FormGroup;
  msg:boolean=false;
  msgErr:boolean=false;

  getNameC(){
    this.usuarios.getAllClients().subscribe(
      res=>{
        this.clients=res.detail;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  regresar(){
    this.router.navigateByUrl('equipos/plantas');
  }

  save(){
    let temp=this.plantaForm.value;
    let nPlant:any={
      'client' : temp.client,
      'name' : temp.name,
      'code' : temp.code,
      'boss' : {
        'name' : temp.ename,
        'email' : temp.email,
        'phone' : temp.phone
      },
      "meta":{
        "registred_by" : this.auth.getId()
      }
    };
    this.plantas.crear(nPlant).subscribe(
      res=>{
        this.msg=true;
        setTimeout(() => {
          this.regresar();
        }, 2000);
      },err=>{
        this.msgErr=true;
        console.log(err);
      }
    );
  }

}
