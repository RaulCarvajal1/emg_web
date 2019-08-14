import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add-empresa.component.css']
})
export class AddEmpresaComponent implements OnInit {

  constructor(private router:Router, 
              public fb: FormBuilder, private empresaService:EmpresasService) 
    {
      this.empresaForm = fb.group({
        name:['', [Validators.required]],
        description:['', [Validators.required]],
      });
    }

  empresaForm :FormGroup;
  msg:boolean=false;
  msgErr:boolean=false;
 

  ngOnInit() {
  }
  regresar(){
    this.router.navigateByUrl('usuarios');
  }
  save(){
    this.empresaService.save(this.empresaForm.value).subscribe(
      res=>{
        this.msg=true;
        setTimeout(() => {
          this.regresar();
        }, 2000);
      },err=>{
        this.msgErr=true;
        console.log(err);
      }
    );
  }

}
