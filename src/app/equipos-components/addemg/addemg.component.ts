import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { EmgsService } from 'src/app/services/emgs.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addemg',
  templateUrl: './addemg.component.html',
  styleUrls: ['./addemg.component.css']
})
export class AddemgComponent implements OnInit, DoCheck {

  constructor(private userService:UsuariosService, private plantsService:PlantasService, private emgServices:EmgsService, private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.loadUsers();
  }
  ngDoCheck(){
    
  }

  users:User[];
  have_plants:boolean=false;
  client_id:string;
  plants:Plant[];
  have_lines:boolean=false;
  plant_id:string;
  lines:Lines[];
  line_id:string;

  modelo:string;
  tipo:string;
  descripcion:string;
  serie:string;
  btn:boolean=false;

  loadUsers(){
    this.userService.getAllUsers().subscribe(res=>{
      this.users=res.detail;
    },err=>{
      console.log(err);
    })
  }
  loadPlants(){
    this.plantsService.getAllPlantas(this.client_id).subscribe(res=>{
      this.plants=res.detail;
      if(this.plants.length==0){
        this.have_plants=false;
      }else{
        this.have_plants=true;
      }
    },err=>{
      console.log(err);
    });
  }
  loadLines(){
    this.plants.forEach(el=>{
      if(el._id==this.plant_id){
        if(el.lines.length==0){
          this.have_lines=false;
        }else{
          this.have_lines=true;
          this.lines=el.lines;
        }
      }
    });
  }

  save(){
    let nemg:any={
      'info': {
        'type':this.tipo,
        'model':this.modelo,
        'description':this.descripcion,
        'serial':this.serie
      },
      'client':this.client_id,
      'plant':this.plant_id,
      'line':this.line_id,
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
          console.log(res);
          this.regresar();
        },err=>{
          console.log(err);
        });
    },err=>{
      console.log(err);
    });
  }

  regresar(){
    this.router.navigateByUrl('equipos/equipos');
  }
  enBtn(){
    if(this.client_id!=''&&this.plant_id!=''&&this.line_id!=''&&this.modelo!=''&&this.tipo!=''&&this.descripcion!=''&&this.serie!=''){
      this.btn=true;
    }else{
      this.btn=false;
    }
  }

}
