import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './basic-components/footer/footer.component';
import { NavbarComponent } from './basic-components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginService } from './services/login.service';
import { AuthService } from "./services/auth.service";
import { UsuariosComponent } from './usuarios-components/usuarios/usuarios.component';
import { PlantasComponent } from './plantas-components/plantas/plantas.component';
import { LineasComponent } from './lineas-components/lineas/lineas.component';
import { EquiposComponent } from './equipos-components/equipos/equipos.component';
import { ServiciosComponent } from './servicios-component/servicios/servicios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosService } from './services/usuarios.service'
import { PlantasService } from './services/plantas.service'
import { EmgsService } from "./services/emgs.service";
import { ServiciosService } from './services/servicios.service';

import { MatMenuModule, MatSnackBarModule } from "@angular/material/";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { ViewUserComponent } from './usuarios-components/view-user/view-user.component';
import { AddUserComponent } from './usuarios-components/add-user/add-user.component';
import { ViewPlantasComponent } from './plantas-components/view-plantas/view-plantas.component';
import { AddPlantaComponent } from './plantas-components/add-planta/add-planta.component';
import { NewlineComponent } from './lineas-components/newline/newline.component';
import { ViewlineComponent } from './lineas-components/viewline/viewline.component';
import { AddemgComponent } from './equipos-components/addemg/addemg.component';
import { ViewemgComponent } from './equipos-components/viewemg/viewemg.component';
import { AddservicioComponent } from './servicios-component/addservicio/addservicio.component';
import { ViewservicioComponent } from './servicios-component/viewservicio/viewservicio.component';


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
    ViewUserComponent,
    AddUserComponent,
    ViewPlantasComponent,
    AddPlantaComponent,
    NewlineComponent,
    ViewlineComponent,
    AddemgComponent,
    ViewemgComponent,
    AddservicioComponent,
    ViewservicioComponent
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
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,
    AuthService,
    UsuariosService,
    PlantasService,
    EmgsService,
    ServiciosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
