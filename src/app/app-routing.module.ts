import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PlantasComponent } from './plantas/plantas.component';
import { LineasComponent } from './lineas/lineas.component';
import { EquiposComponent } from './equipos/equipos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  {path : "inicio", component : InicioComponent},
  {path : "usuarios", component : UsuariosComponent},
  {path : "usuarios/:id", component : ViewUserComponent},
  {path : "equipos/plantas", component : PlantasComponent},
  {path : "equipos/lineas", component : LineasComponent},
  {path : "equipos/equipos", component : EquiposComponent},
  {path : "servicios", component : ServiciosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
