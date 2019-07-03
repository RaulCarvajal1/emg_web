import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private auth: AuthService) { }
  admin: boolean = false;
  tecni: boolean = false;
  clien: boolean = false;

  ngOnInit() {
    switch (this.auth.getRole()) {
      case 0:
        this.admin = true;
        break;
      case 1:
        this.tecni = true;
        break;
      case 2:
        this.clien = true;
        break;
    }
  }

}
