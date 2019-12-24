import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantasService } from 'src/app/services/plantas.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';
import { empresa } from 'src/app/interfaces/clients.interface';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Select2OptionData } from 'ng-select2';

 
@Component({
  selector: 'app-add-planta',
  templateUrl: './add-planta.component.html',
  styleUrls: ['./add-planta.component.css']
})
export class AddPlantaComponent implements OnInit {

  constructor(
    public fb: FormBuilder, 
    private router:Router, 
    private clientes:EmpresasService, 
    private plantas:PlantasService, 
    private auth:AuthService,
    private location:Location,
    private alert:AlertService)
  { 
    this.plantaForm=fb.group({
      client:['', [Validators.required]],
      name:['', [Validators.required]],
      code:['', [Validators.required]],
      ename:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required, Validators.minLength(10)]],
    });
  }
 
  ngOnInit() {
    this.getNameC();
  }

  clients:empresa[];
  plantaForm:FormGroup;
  saving:boolean = false;
  public selec2data: Observable<Array<Select2OptionData>>;
  temp:Select2OptionData[] = [];

  getNameC(){
    this.clientes.get().subscribe(
      res=>{
        this.clients=res.detail;
        this.selec2data=this.genObservable(this.genArrayList());
      },err=>{
        console.error(err);
        return "No definido";
      }
    )
  }
  regresar(){
    this.location.back();
  }

  genArrayList():Select2OptionData[]{
    this.clients.forEach(el => {
      this.temp.push({id : el._id+'', text : el.name});
    });
    return this.temp;
  }

  genObservable(arr:Select2OptionData[]):Observable<Array<Select2OptionData>> {
    return Observable.create((obs) => {
      obs.next(arr);
      obs.complete();
    });
  }

  save(){
    this.saving = true;
    let temp=this.plantaForm.value;
    let nPlant:any={
      'client' : temp.client,
      'name' : temp.name,
      'code' : temp.code,
      'boss' : {
        'name' : temp.ename,
        'email' : temp.email,
        'phone' : temp.phone
      },
      "meta":{
        "registred_by" : this.auth.getId()
      }
    };
    this.plantas.crear(nPlant).subscribe(
      res=>{
        this.saving = false;
        this.alert.success("La planta fue exitosamente registrada, serás redirigido en unos segundos.");
        setTimeout(() => {
          this.regresar();
        }, 4000);
      },err=>{
        this.saving = false;
        this.alert.error("Error durante el registro");
        console.log(err);
      }
    );
  }

}
