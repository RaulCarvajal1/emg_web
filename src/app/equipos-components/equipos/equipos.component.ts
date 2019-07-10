import { Component, OnInit } from '@angular/core';
import { EmgsService } from 'src/app/services/emgs.service';
import { emgs } from 'src/app/interfaces/emg.interface';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { User } from 'src/app/interfaces/user.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { Select2OptionData } from 'ng-select2';
import { delay } from 'q';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  constructor(private emgService: EmgsService, private router: Router,
              private userService: UsuariosService, private plantService: PlantasService)
              {
                this.getAllEmgs();
                this.loadUsers();
                this.loadPlant();
              }

  ngOnInit() {
  }

  emgs:emgs[];
  clients:User[];
  client_id:string;
  plant_id:string;
  line_id:string;
  plants:Plant[]; 
  lines:Lines[];
  busqByName:string="";
  busqBySerial:string="";

  clientesList: Array<Select2OptionData>=[];

  have_lines:boolean=false;

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
      console.log(res.detail);
      this.setClientList(this.clients);
    },err=>{
      console.log(err);
    })
  }
  setClientList(a:any[]){
    this.clientesList.push({
      id: 'alls',
      text: 'Ver todos'
    });
    a.forEach(c=>{
      this.clientesList.push({
        id : c._id,
        text : c.info.name
      });
    });
  }
  loadPlant(){
    this.plantService.getAll().subscribe(res=>{
      this.plants=res.detail;
    },err=>{
      console.log(err);
    })
  }
  loadLines(){
    this.line_id="";
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
    this.line_id="";
    this.plant_id="";
    this.emgs=[];
    if(this.client_id==""|| this.client_id=="alls"){
      this.getAllEmgs();
    }else{
      this.emgService.getByClient(this.client_id).subscribe(
        res=>{
          this.emgs=res.detail;
        },err=>{
          console.log(err);
        }); 
    }
  }
  loadEmgsByPlant(){
    this.loadLines();
    if(this.plant_id==""|| this.plant_id=="alls"){
      this.getAllEmgs();
    }else{
      this.emgService.getByPlant(this.plant_id).subscribe(
        res=>{
          this.emgs=res.detail;
        },err=>{
          console.log(err);
        }); 
    }
  }  
  loadEmgsByPlantAndLines(){
    this.client_id="";
    this.emgs=[];
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
  goNewEmg(){
    this.router.navigateByUrl('equipos/equipos/nuevo');
  }
  busquedaByName(){
    this.client_id="";
    this.plant_id="";
    this.line_id="";
    if(this.busqByName==""){
      this.getAllEmgs();
    }else{
      var regex = new RegExp(this.busqByName.toLowerCase());
      let temp:emgs[]=this.emgs;
      this.emgs=temp.filter(emg => emg.info.name.toLowerCase().match(regex))
    }
  }
  busquedaBySerial(){
    this.client_id="";
    this.plant_id="";
    this.line_id="";
    if(this.busqBySerial==""){
      this.getAllEmgs();
    }else{
      var regex = new RegExp(this.busqBySerial.toLowerCase());
      let temp:emgs[]=this.emgs;
      this.emgs=temp.filter(emg => emg.info.serial.toLowerCase().match(regex))
    }
  }
  getStatus(s:Number){
    if(s==1){
      return "Desactivado";
    }else{
      return "Activo"
    }
  }
}
