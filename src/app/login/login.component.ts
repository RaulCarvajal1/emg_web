import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router';
import { AuthService } from "./../services/auth.service";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router:Router,
              private auth:AuthService, public fb: FormBuilder) {
    
    this.logForm = this.fb.group({
      usr: ['', [Validators.required]],
      pwd: ['', [Validators.required]]
    });
  }

  logForm: FormGroup;
  faillog:boolean=false;

  ngOnInit() {
    if(this.auth.isLoged()){
      this.router.navigate(["inicio"]);
    }
  }

  login(){
    this.loginService.login(this.logForm.value.usr,this.logForm.value.pwd).subscribe(
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