import { ActualizarPreguntaComponent } from './pages/admin/actualizar-pregunta/actualizar-pregunta.component';
import { AddPreguntaComponent } from './pages/admin/add-pregunta/add-pregunta.component';
import { ViewExamenPreguntasComponent } from './pages/admin/view-examen-preguntas/view-examen-preguntas.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriasComponent } from './pages/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './pages/admin/add-examen/add-examen.component';
import { StartComponent } from './pages/user/start/start.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';

const routes: Routes = [
  {
    path : 'home',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path : 'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path : 'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path : 'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path : 'profile',
        component: ProfileComponent
      },
      {
        path : '',
        component: WelcomeComponent
      },
      {
        path : 'categorias',
        component:ViewCategoriasComponent
      },
      {
        path : 'add-categorias',
        component:AddCategoriaComponent
      },
      {
        path : 'examenes',
        component:ViewExamenesComponent
      },
      {
        path : 'add-examen',
        component:AddExamenComponent
      },
      {
        path : 'examen/:examenId',
        component:ActualizarExamenComponent

      },
      {
        path : 'ver-preguntas/:examenId/:titulo',
        component:ViewExamenPreguntasComponent

      },
      {
        path : 'add-pregunta/examen/:examenId/:titulo',
        component:AddPreguntaComponent
      },
      {
        path : 'actualizar-pregunta/examen/:examenId/pregunta/:preguntaId/:titulo',
        component:ActualizarPreguntaComponent
      }
    ]
  },
  {
    path : 'user-dashboard',
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path : ':catId',
        component: LoadExamenComponent
      },
      {
        path : 'instrucciones/:examenId',
        component: InstruccionesComponent
      }
    ]
  },
  {
    path : 'start/:examenId',
    component: StartComponent,
    canActivate:[NormalGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
