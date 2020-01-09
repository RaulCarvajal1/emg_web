import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { EmgsService } from 'src/app/services/emgs.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';

@Component({
  selector: 'app-addemg',
  templateUrl: './addemg.component.html',
  styleUrls: ['./addemg.component.css']
})
export class AddemgComponent implements OnInit{

  constructor(private empresaService:EmpresasService, private plantsService:PlantasService, 
              private emgServices:EmgsService, private router:Router, 
              private authService:AuthService, private fb:FormBuilder,
              private alert:AlertService, private location: Location,
              private agreementsServices:AgreementsService) 
              { 

                this.emgForm = this.fb.group({
                  cliente : ['',[Validators.required]],
                  planta : ['',[Validators.required]],
                  linea : ['',[Validators.required]],
                  nombre : ['',[]],
                  modelo : ['',[Validators.required]],
                  tipo : ['',[Validators.required]],
                  desc : ['',[Validators.required]],
                  serie : ['',[Validators.required]],
                  cod_pro : ['',[]],
                  agreement : ['',[Validators.required]]
                });

              }

  ngOnInit() {
    this.loadUsers();
    this.getContratos();
  }

  emgForm:FormGroup;

  users:User[];
  plants:Plant[];
  lines:Lines[];
  shortname_line:string;
  nombre:string;
  contratos: Contrato[];

  load: boolean = true;
  guardando: boolean = false;

  loadUsers(){
    this.empresaService.get().subscribe(res=>{
      this.users=res.detail;
      this.load = false;
      console.log(this.users);
    },err=>{
      console.log(err);
    })
  }
  loadPlants(){
    let temp:any = this.emgForm.value;
    this.plantsService.getAllPlantas(temp.cliente).subscribe(res=>{
      this.plants=res.detail;
    },err=>{
      console.log(err);
    });
  }
  loadLines(){
    let temp:any = this.emgForm.value;
    this.plants.forEach(el=>{
      if(el._id==temp.planta){
        this.lines=el.lines;
      }
    });
  }
  saveLine(){
    let temp:any=this.emgForm.value;
    this.plants.forEach(plant=>{
      if(plant._id==temp.planta){
        this.lines.forEach(line=>{
          if(line._id==temp.linea){
            this.shortname_line=line.shortname;
          }
        })
      }
    });
  }

  genName(){
    let temp:any=this.emgForm.value;
    this.emgServices.getByLine(temp.linea).subscribe(
      res=>{
        console.log(res);
        this.nombre=this.shortname_line+'_emg'+(res.detail.length+1);
      },err=>{

      }
    )
  }

  save(){
    this.guardando = true;
    console.log(this.emgForm.controls);
    let temp=this.emgForm.value;
    let nemg:any={
      'info': {
        'name':this.nombre,
        'type':temp.tipo,
        'model':temp.modelo,
        'description':temp.desc,
        'serial':temp.serie
      },
      'client':temp.cliente,
      'plant':temp.planta,
      'line':temp.linea,
      'cod_pro':temp.cod_pro,
      'agreement':temp.agreement,
      'status':0,
      'active':true,
      'meta':{
        'registred_by' : this.authService.getId()
      }
    };
    this.emgServices.create(nemg).subscribe(
    res=>{
      this.emgServices.genEmg(res.detail._id).subscribe(
        res=>{
          this.guardando = false
          this.alert.success("Registro creado con éxito, serás redigirido en unos segundos.");
          setTimeout(()=>{
            this.regresar();
          },1500);
        },err=>{
          this.alert.error("Ocurrio un error durante el registro");
        });
    },err=>{
      console.log(err);
      this.alert.error("Ocurrio un error durante el registro");
    });
  }

  regresar(){
    this.location.back();
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

}
