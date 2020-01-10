import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EmgsService } from 'src/app/services/emgs.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { emgs } from 'src/app/interfaces/emg.interface';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { empresa } from 'src/app/interfaces/clients.interface';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-addcontratos',
  templateUrl: './addcontratos.component.html',
  styleUrls: ['./addcontratos.component.css']
})
export class AddcontratosComponent implements OnInit {

  constructor(private fb:FormBuilder, private userServices:UsuariosService, 
              private emgServices:EmgsService, private agreementService:AgreementsService,
              private router:Router, private location:Location,
              private empresaService:EmpresasService, private alert:AlertService) 
              {
                this.contratoForm = fb.group(
                  {
                    name : ['',[Validators.required]],
                    description : ['',[Validators.required]],
                    start : [null,[]],
                    end : [null,[]],
                    single : [false,[]],
                    client : ['',[Validators.required]],
                    monto : ['',[Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)]]
                  }
                );
              }

  empresas:empresa[];
  emgs:emgs[];
  emg_c_id: String;
  contratoForm:FormGroup;
 
  public selec2data: Observable<Array<Select2OptionData>>;
  temp:Select2OptionData[] = [];
  public options: Options;

  ngOnInit() {
    this.loadEmgs();
    this.loadEmpresas();
  }
  genObservable(arr:Select2OptionData[]):Observable<Array<Select2OptionData>> {
    return Observable.create((obs) => {
      obs.next(arr);
      obs.complete();
    });
  }
  genArrayList():Select2OptionData[]{
    this.emgs.forEach(el => {
      this.temp.push({id : el._id+'', text : el.info.name});
    });
    return this.temp;
  }
  loadEmgs(){
    this.emgServices.getAll().subscribe(
      res=>{
        this.emgs=res.detail;
        this.selec2data=this.genObservable(this.genArrayList());
        this.options = {
          width: '500',
          multiple: true,
          tags: true
        };
      },err=>{
        console.error(err);
      }
    );
  }
  /*
  0. Solicitado por cliente(Falta asignar tecnico)
  1. Programado
  2. En proceso
  3. Realizado
  */
  save(){
    let tempc = this.contratoForm.value;
    const temp = {
      'client' : tempc.client,//Names para ahorrar tiempo
      'description' : tempc.description,
      'emgsNames' : tempc.emgs,//Names para ahorrar tiempo
      'name' : tempc.name,
      'period' : {
        'start' : tempc.start,
        'end' : tempc.end,
        'single' : tempc.single
      },
      'monto' : tempc.monto,
      'monto_actual' : tempc.monto
    };
    console.log(temp); 
    this.agreementService.saveContrato(temp).subscribe(
       res=>{
        this.alert.success("Contrato creado correctamente, serás redirigido en unos segundos.");
        setTimeout(() => {
          this.regresar();
        }, 1500);
      },err=>{
        console.log(err);
        this.alert.error("Error durante el registro");
        setTimeout(() => {
          this.regresar();
        }, 1500);
      }
    );
  }
  regresar(){
    this.location.back();
  } 
  loadEmpresas(){
    this.empresaService.get().subscribe(
      res => {
        this.empresas = res.detail;
        console.log(res);
      },
      err => {
        console.error(err)
      }
    );
  }
}