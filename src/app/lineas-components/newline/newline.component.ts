import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { Plant } from 'src/app/interfaces/plant.interface';

@Component({
  selector: 'app-newline',
  templateUrl: './newline.component.html',
  styleUrls: ['./newline.component.css']
})
export class NewlineComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private planta:PlantasService, private plantas:PlantasService, private auth:AuthService) { }

  ngOnInit() {
    this.id_p=this.activatedRoute.snapshot.paramMap.get("id");
    this.getName(this.id_p);
  }

  id_p:string="";

  p_namestr="";
  p_name:Plant;

  nLine:number=0;
  nDesc:string="";

  getName(id:any){
    this.planta.getPlanta(id).subscribe(
      res=>{
        this.p_name=res.detail;
        this.p_namestr = this.p_name.name;
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  regresar(){
    this.router.navigateByUrl('equipos/lineas');
  }
  enbuts():boolean{
    if(this.nLine!=0||this.nDesc!=""){
      return false;
    }else{
      return true;
    }
  }
  crearClick(){
    this.actualizar(this.nLine,this.nDesc);
  }
  actualizar(n:number,d:string){
    let nline:any={
        'number' : n,
        'desc' : d
      };
    this.planta.addLinea(nline, this.id_p).subscribe(
      res=>{
        //console.log(res);
        this.regresar();
      },err=>{
        console.log(err);
      }
    );
  }

}
