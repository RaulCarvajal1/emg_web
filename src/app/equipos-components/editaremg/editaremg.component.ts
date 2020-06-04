import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlantasService } from 'src/app/services/plantas.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/interfaces/user.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Location } from '@angular/common';
import { emgs } from 'src/app/interfaces/emg.interface';

@Component({
  selector: 'app-editaremg',
  templateUrl: './editaremg.component.html',
  styleUrls: ['./editaremg.component.css']
})
export class EditaremgComponent implements OnInit {

  constructor(private empresaService:EmpresasService, private plantsService:PlantasService, 
              private emgServices:EmgsService, private router:Router, 
              private authService:AuthService, private fb:FormBuilder,
              private alert:AlertService, private location: Location,
              private emgService:EmgsService, private activatedRoute:ActivatedRoute) 
              { 
                this.getEmg();
                this.cliente = this.activatedRoute.snapshot.paramMap.get('c') === 'false';
              }

  ngOnInit() {
    this.loadUsers();
  }

  emgForm:FormGroup;

  users:User[];
  plants:Plant[];
  lines:Lines[];
  shortname_line:string;

  load: boolean = true;
  guardando: boolean = false;

  cliente: boolean;

  emg:emgs;

  initForm(emg: emgs){
    this.emgForm = this.fb.group({
      cliente : [emg.client,[Validators.required]],
      planta : ['',[Validators.required]],
      linea : ['',[Validators.required]],
      nombre : [emg.info.name,[]],
      modelo : [emg.info.model,[Validators.required]],
      tipo : [emg.info.type,[Validators.required]],
      desc : [emg.info.description,[Validators.required]],
      serie : [emg.info.serial,[Validators.required]],
      cod_pro : [emg.cod_pro,[Validators.required]],
      enlaces : [emg.enlaces,[]],
      extras : [emg.extras,[]],
      _id : [emg._id,[]]
    });
    this.loadPlants();
    this.emgForm.patchValue({
      planta : emg.plant
    });
    setTimeout(() => {
      this.loadLines();
      this.emgForm.patchValue({
        linea : emg.line
      });
      this.load = false;
    }, 750);
  }
  getEmg(){
    this.emgService.getById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      this.emg=res.detail;
      this.initForm(this.emg);
    },req=>{
      console.log(req);
    });
  }
  
  loadUsers(){
    this.empresaService.get().subscribe(res=>{
      this.users=res.detail;
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
    this.lines = this.plants.find( e => e._id == this.emgForm.value.planta).lines;
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

  save(){
    this.guardando = true;
    console.log(this.emgForm.controls);
    let temp=this.emgForm.value;
    let nemg:any={
      'info': {
        'name':temp.nombre,
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
      },
      '_id': temp._id,
      'enlaces' : temp.enlaces,
      'extras' : temp.extras
    };
    this.emgServices.update(nemg).subscribe(
    res=>{
      this.guardando = false
      this.alert.success("Registro actualizado con éxito, serás redigirido en unos segundos.");
      setTimeout(()=>{
        this.regresar();
      },1500);
    },err=>{
      console.log(err);
      this.alert.error("Ocurrio un error durante la actualización");
    });
  }

  regresar(){
    this.location.back();
  } 

}
