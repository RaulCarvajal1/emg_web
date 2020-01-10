import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "../services/configuration.service";
import { PricesService } from '../services/prices.service';
import { AlertService } from '../services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor(
    private configServices:ConfigurationService,
    private pricesServices:PricesService,
    private alert:AlertService
    ) { }

  addserv: boolean = false;
  fecAnt: boolean;
  tipos: any[];
  newTipo: String ;
  iva:number = 0;
  unitprice:number = 0;
  ivaAct:string = '';
  unitpriceAct:string = '';

  ngOnInit() {
    this.fecExiste();
    this.getTipos();
    this.getIva();
    this.getUnitprice();
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

  getIva(){
    this.pricesServices.getIva().subscribe(
      res => {
        this.iva = res.detail.iva;
        var registro = moment(res.detail.last_mod.replace('T',' ').slice(0,16)).locale('es');
        let temp = registro.format('dddd, MMMM Do YYYY');
        this.ivaAct =  temp.charAt(0).toUpperCase()+temp.slice(1);
      }
    );
  }

  getUnitprice(){
    this.pricesServices.getUnitprice().subscribe(
      res => {
        this.unitprice = res.detail.unitprice;
        var registro = moment(res.detail.last_mod.replace('T',' ').slice(0,16)).locale('es');
        let temp = registro.format('dddd, MMMM Do YYYY');
        this.unitpriceAct =  temp.charAt(0).toUpperCase()+temp.slice(1);
      }
    );
  }

  actualizarIva(){
    if(this.iva == null){
      this.alert.error("Digite un IVA válido");
    }else if(this.iva < 0){
      this.alert.error("Digite un IVA mayor a 0");
    }else if(this.iva > 1){
      this.alert.error("Digite un IVA menor que 1");
    }else{
      this.pricesServices.saveIva({'iva':this.iva}).subscribe(
        res => this.alert.success("IVA actualizado correctamente")
      )
    }
  }

  actualizarPrecio(){
    if(this.unitprice == null){
      this.alert.error("Digite un IVA válido");
    }else if(this.unitprice < 0){
      this.alert.error("Digite un precio mayor a 0");
    }else{
      this.pricesServices.saveUnitprice({'unitprice':this.unitprice}).subscribe(
        res => this.alert.success("Precio actualizado correctamente")
      )
    }
  }
}
