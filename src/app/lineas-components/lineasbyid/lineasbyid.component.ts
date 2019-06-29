import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { Plant, Lines } from 'src/app/interfaces/plant.interface';
import { Router, ActivatedRoute } from "@angular/router";
import { PlantasService } from 'src/app/services/plantas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lineasbyid',
  templateUrl: './lineasbyid.component.html',
  styleUrls: ['./lineasbyid.component.css']
})
export class LineasbyidComponent implements OnInit {

  constructor(private router:Router, private plantas:PlantasService, private usuarios:UsuariosService, private activatedRoute:ActivatedRoute,) { 
    this.id_p=this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getPlants();
    this.getClients();
  }

  planta:Plant[];
  clns:User[];
  clientes:User[];
  lines:Lines[];

  nPlantas:Plant[];

  load:boolean=false;
  id_cliente;
  id_planta;
  clientSel=true;
  busq:String="";
  id_p: String="";

  sinPlantas:boolean=false;
  sinLineas:boolean=false;

  loadPlants(){
    this.id_planta='';
    this.plantas.getAllPlantas(this.id_cliente).subscribe(
    (data)=>{
      this.lines=[];
      this.planta=data.detail;
      this.clientSel = false;
      if( this.planta.length == 0 ){
        this.sinPlantas = true;
        this.clientSel = true;
      }else{
        this.sinPlantas = false;
      }
    },
    (err)=>{
      console.log(err)
    });
  }
  getClients():any{
    this.usuarios.getAllClients().subscribe(
      res=>{
        this.clientes=res.detail;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  plantDet(id:string){
    this.router.navigateByUrl('equipos/lineas/'+this.id_planta+"/"+id);
  }
  goNewLine(){
    this.router.navigateByUrl('equipos/lineas/nueva/'+this.id_planta);
  }
  loadLineas(){
    this.planta.forEach(el=>{
      if(el._id==this.id_planta){
        this.lines=el.lines;
      }
      this.load=true;
    });
  }
  busqueda(){
    if(this.busq==""){
      this.loadLineas();
    }else{
      var regex = new RegExp(this.busq.toLowerCase());
      let temp:Lines[]=this.lines;
      this.lines=temp.filter(lns => lns.name.toLowerCase().match(regex))
    }
  }
  loadRet(na:any[]){
    na.forEach(el=>{
      if(el._id == this.id_p){
        this.lines = el.lines;
        console.log(el)
      }
      this.load=true;
    });
  }
  getPlants(){
    this.plantas.getAll().subscribe(
    (data)=>{;
      this.loadRet(data.detail);
    },
    (err)=>{
      console.log(err)
    });
  }
}