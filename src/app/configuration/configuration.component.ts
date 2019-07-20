import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "../services/configuration.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(private configServices:ConfigurationService) { }

  ngOnInit() {
    this.fecExiste();
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

  fecAnt: boolean;

  change(){
    console.log(!this.fecAnt);
    this.configServices.changeFec({ "value" : !this.fecAnt}).subscribe(
      res => {
      }, err => {
      }
    )
  }

}
