import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmgsService } from 'src/app/services/emgs.service';
import { User } from 'src/app/interfaces/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PlantasService } from 'src/app/services/plantas.service';

@Component({
  selector: 'app-viewemg',
  templateUrl: './viewemg.component.html',
  styleUrls: ['./viewemg.component.css']
})
export class ViewemgComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private emgService:EmgsService, private userService:UsuariosService, private plantasService:PlantasService) { 
    this.getEmg(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
  }

  getEmg(id:string){
    this.emgService.getById(id).subscribe(res=>{
      console.log(res);
    },req=>{
      console.log(req);
    });
  }

}
