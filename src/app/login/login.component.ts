import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import { AuthService } from "./../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,private router:Router,private auth:AuthService) { }

  user:string="";
  pass:string="";
  faillog:boolean=false;

  ngOnInit() {
    if(this.auth.isLoged()){
      this.router.navigate(["inicio"]);
    }
  }

  login(){
    this.loginService.login(this.user, this.pass).subscribe(
      (res)=>{
        this.setSession(res);
      },
      (err)=>{
        console.log(err)
      })
    };

  setSession(res){
    if(res.authorized){
      sessionStorage.setItem("detalle",JSON.stringify(res.detail));
      this.faillog=false;
      this.router.navigate(['inicio']);
    }else{
      this.faillog=true;
    }
  }
}