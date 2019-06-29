import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios-components/usuarios/usuarios.component';
import { PlantasComponent } from './plantas-components/plantas/plantas.component';
import { LineasComponent } from './lineas-components/lineas/lineas.component';
import { LineasbyidComponent } from './lineas-components/lineasbyid/lineasbyid.component';
import { EquiposComponent } from './equipos-components/equipos/equipos.component';
import { ServiciosComponent } from './servicios-component/servicios/servicios.component';
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
import { MiCuentaComponent } from './basic-components/mi-cuenta/mi-cuenta.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'inicio', component : InicioComponent},
  {path : 'usuarios', component : UsuariosComponent},
  {path : 'usuarios/nuevo', component : AddUserComponent},
  {path : 'usuarios/:id', component : ViewUserComponent},
  {path : 'equipos/plantas', component : PlantasComponent},
  {path : 'equipos/plantas/:id', component : ViewPlantasComponent},
  {path : 'equipos/plantas/nueva/:id', component : AddPlantaComponent},
  {path : 'equipos/lineas', component : LineasComponent},
  {path : 'equipos/lineas/:id', component : LineasbyidComponent},
  {path : 'equipos/lineas/nueva/:id', component : NewlineComponent},
  {path : 'equipos/lineas/:id_p/:id_l', component : ViewlineComponent},
  {path : 'equipos/equipos', component : EquiposComponent},
  {path : 'equipos/equipos/nuevo', component : AddemgComponent},
  {path : 'equipos/equipos/:id', component : ViewemgComponent},
  {path : 'servicios', component : ServiciosComponent},
  {path : 'servicios/nuevo', component : AddservicioComponent},
  {path : 'servicios/:id', component : ViewservicioComponent},
  {path : 'micuenta', component : MiCuentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
