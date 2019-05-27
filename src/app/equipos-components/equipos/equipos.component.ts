import { Component, OnInit } from '@angular/core';
import { EmgsService } from 'src/app/services/emgs.service';
import { emgs } from 'src/app/interfaces/emg.interface';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { PlantasService } from 'src/app/services/plantas.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  constructor(private emgService:EmgsService, private router:Router, private userService:UsuariosService, private plantService:PlantasService) { }

  ngOnInit() {
    this.getAllEmgs();
    this.loadUsers();
    this.loadPlant();
  }

  filter_o:any;
  too:boolean=false;
  pcli:boolean=false;
  pplali:boolean=false;
  load:boolean=false;
  emgs:emgs[];
  clients:User[];
  client_id:string;
  plant_id:string;
  line_id:string;
  plants:Plant[];
  lines:Lines[];
  have_lines:boolean=false;

  check_filter(){
    switch (this.filter_o) {
      case "0":
        this.too=false;
        this.getAllEmgs();
        break;
      case "1":
        this.pplali=false;
        this.too=true;
        this.pcli=true;
        break;
      case "2":
        this.too=true;
        this.pcli=false;
        this.pplali=true;
        break;
      default:
        break;
    }
  }

  getAllEmgs(){
    this.emgService.getAll().subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.log(err);
      });
  }

  loadUsers(){
    this.userService.getAllClients().subscribe(res=>{
      this.clients=res.detail;
    },err=>{
      console.log(err);
    })
  }

  loadPlant(){
    this.plantService.getAll().subscribe(res=>{
      this.plants=res.detail;
    },err=>{
      console.log(err);
    })
  }

  loadLines(){
    this.plants.forEach(el=>{
      if(el._id==this.plant_id){
        this.lines=el.lines;
      }
    });
    if(this.lines.length==0){
      this.have_lines=false;
    }else{
      this.have_lines=true;
    }
  }

  loadEmgsByClient(){
    this.emgService.getByClient(this.client_id).subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.log(err);
      });
  }

  loadEmgsByPlantAndLines(){
    this.emgService.getByPlantAndLine(this.plant_id,this.line_id).subscribe(
      res=>{
        this.emgs=res.detail;
      },err=>{
        console.log(err);
      });
  }
 
  detEmg(id:string){
    this.router.navigateByUrl('/equipos/equipos/'+id);
  }
  /*vacio():boolean{
    if(this.emgs.length()==0){
      return true;
    }else{
      return false;
    }
  }*/

  goNewEmg(){
    this.router.navigateByUrl('equipos/equipos/nuevo');
  }

}
