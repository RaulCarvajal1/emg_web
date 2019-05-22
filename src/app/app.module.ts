import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginService } from './services/login.service';
import { AuthService } from "./services/auth.service";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PlantasComponent } from './plantas/plantas.component';
import { LineasComponent } from './lineas/lineas.component';
import { EquiposComponent } from './equipos/equipos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosService } from './services/usuarios.service'

import { MatMenuModule } from "@angular/material/";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { ViewUserComponent } from './view-user/view-user.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    InicioComponent,
    UsuariosComponent,
    PlantasComponent,
    LineasComponent,
    EquiposComponent,
    ServiciosComponent,
    ViewUserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule
  ],
  providers: [
    LoginService,
    AuthService,
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
