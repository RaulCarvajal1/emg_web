import { Component, OnInit } from '@angular/core';
import { AgreementsService } from 'src/app/services/agreements.service';
import { Contrato } from 'src/app/interfaces/agreement.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  constructor(private contratosService:AgreementsService, private router:Router) {
    this.getContratos();
  }

  contratos: Contrato[];

  ngOnInit() {
  }

  getContratos(){
    this.contratosService.getContratos().subscribe(
      res => { 
        this.contratos = res.detail;
        console.log(res);
      },err => {
        console.log(err);
      }
    )
  }


  contratoDet(id){
    this.router.navigateByUrl(`contratos/${id}`);
  }
  goNewContrato(){
    this.router.navigateByUrl(`contratos/nuevo`)
  }
}
