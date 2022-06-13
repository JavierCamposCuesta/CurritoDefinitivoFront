import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioDetalleComponent } from './anuncio/anuncio-detalle/anuncio-detalle.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth-guard.service';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
      path: 'home',
      component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{ 
  path: 'profile',
  component: ProfileComponent,
  loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule ), canLoad:[AuthGuard]
},
{
  path: 'anuncio',
  component: AnuncioComponent
},
{
  path: 'anuncio/:termino',
  component: AnuncioComponent
},
{
  path: 'anuncio-detalle',
  component: AnuncioDetalleComponent
},
{
  path: 'anuncio-detalle/:id',
  component: AnuncioDetalleComponent
},
{
  path: '**',
  component: HomeComponent
},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
