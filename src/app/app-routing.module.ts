import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { MiCuentaComponent } from './basic-components/mi-cuenta/mi-cuenta.component';
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
import { MisPlantasComponent } from './clientes-components/mis-plantas/mis-plantas.component';
import { MisLineasComponent } from './clientes-components/mis-lineas/mis-lineas.component';
import { MisEquiposComponent } from './clientes-components/mis-equipos/mis-equipos.component';
import { MisServiciosComponent } from './clientes-components/mis-servicios/mis-servicios.component';
import { SolicitarServicioComponent } from './clientes-components/solicitar-servicio/solicitar-servicio.component';
import { MisServiciosTecComponent } from './tecnicos-components/mis-servicios-tec/mis-servicios-tec.component';
import { IniciarServicioComponent } from './tecnicos-components/iniciar-servicio/iniciar-servicio.component';
//Vistas clientes
import { VerMiPlantaComponent } from './clientes-components/ver-mi-planta/ver-mi-planta.component';
import { VerMiLineaComponent } from './clientes-components/ver-mi-linea/ver-mi-linea.component';
import { VerMiEquipoComponent } from './clientes-components/ver-mi-equipo/ver-mi-equipo.component';
import { NuevoMiEquipoComponent } from './clientes-components/nuevo-mi-equipo/nuevo-mi-equipo.component';
import { NuevoMiLineaComponent } from './clientes-components/nuevo-mi-linea/nuevo-mi-linea.component';
import { NuevoMiPlantaComponent } from './clientes-components/nuevo-mi-planta/nuevo-mi-planta.component';

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
  //Cliente
  {path : 'misplantas', component : MisPlantasComponent},
  {path : 'misplantas/nueva', component : NuevoMiPlantaComponent},
  {path : 'misplantas/:id', component : VerMiPlantaComponent},
  {path : 'mislineas', component : MisLineasComponent},
  {path : 'mislineas/nueva', component : NuevoMiLineaComponent},
  {path : 'mislineas/:id', component : VerMiLineaComponent},
  {path : 'misequipos', component : MisEquiposComponent},
  {path : 'misequipos/nuevo', component : NuevoMiEquipoComponent},
  {path : 'misequipos/:id', component : VerMiEquipoComponent},
  {path : 'misservicios', component : MisServiciosComponent},
  {path : 'misservicios/solicitar', component : SolicitarServicioComponent},
  //Tecnicos
  {path : 'misservicios-tec', component : MisServiciosTecComponent},
  {path : 'misservicios/iniciar/:id', component : IniciarServicioComponent},
  {path : 'micuenta', component : MiCuentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }