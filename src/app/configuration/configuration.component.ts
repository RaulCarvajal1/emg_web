import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "../services/configuration.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(private configServices:ConfigurationService) { }

  addserv: boolean = false;
  fecAnt: boolean;
  tipos: any[];
  newTipo: String ;


  ngOnInit() {
    this.fecExiste();
    this.getTipos();
  }

  addTipo(){
    this.addserv = !this.addserv;
  }

  getTipos(){
    this.configServices.getTipos().subscribe(
      res => {
        this.tipos = res.detail;
      },err => {
        console.log(err);
      }
    );
  }
 
  saveTipo(){
    this.configServices.existeTipo(this.newTipo).subscribe(
      res => {
        if(res.detail.length == 0){
          this.configServices.saveTipo({'name' : this.newTipo}).subscribe(
            res => {
              this.addserv = !this.addserv;
              this.getTipos();
              this.newTipo="";
            },err => {
              console.error(err);
            }
          );
        }else{
          this.configServices.actualizarTipo(this.newTipo).subscribe(
            res => {
              this.addserv = !this.addserv;
              this.getTipos();
              this.newTipo="";
            },
            err => console.log(err)
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  delTipo(id){
    this.configServices.deleteTipo(id).subscribe(
      res=>{ this.getTipos(); },err=>{}
    );
  }

  fecExiste(){
    this.configServices.getFec().subscribe(
      res => {
        console.log(res.detail.value)
        if(res.detail==null){
          this.configServices.setFec().subscribe(res=>{console.log(res)},err=>{});
          this.fecAnt = false;
        }else{
          this.fecAnt = res.detail.value;
        }
      },err => {
        console.log(err);
      }
    )
  }

  change(){
    console.log(!this.fecAnt);
    this.configServices.changeFec({ "value" : !this.fecAnt}).subscribe(
      res => {
      }, err => {
      }
    )
  }

}
