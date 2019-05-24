import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios-components/usuarios/usuarios.component';
import { PlantasComponent } from './plantas-components/plantas/plantas.component';
import { LineasComponent } from './lineas-components/lineas/lineas.component';
import { EquiposComponent } from './equipos-components/equipos/equipos.component';
import { ServiciosComponent } from './servicios-component/servicios/servicios.component';
import { ViewUserComponent } from './usuarios-components/view-user/view-user.component';
import { AddUserComponent } from "./usuarios-components/add-user/add-user.component";
import { ViewPlantasComponent } from './plantas-components/view-plantas/view-plantas.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path : "inicio", component : InicioComponent},
  {path : "usuarios", component : UsuariosComponent},
  {path : "usuarios/nuevo", component : AddUserComponent},
  {path : "usuarios/:id", component : ViewUserComponent},
  {path : "equipos/plantas", component : PlantasComponent},
  {path : "equipos/plantas/:id", component : ViewPlantasComponent},
  {path : "equipos/lineas", component : LineasComponent},
  {path : "equipos/equipos", component : EquiposComponent},
  {path : "servicios", component : ServiciosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
