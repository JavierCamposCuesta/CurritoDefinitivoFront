import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { AddCurritoComponent } from './add-currito/add-currito.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MessagesComponent } from './messages/messages.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisCurritosComponent } from './mis-curritos/mis-curritos.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { SolicitadosComponent } from './solicitados/solicitados.component';



const routes: Routes = [
    
    { path: 'favorites',canActivate:[AuthGuard], component: FavoritesComponent },
    { path: 'addCurrito',canActivate:[AuthGuard], component: AddCurritoComponent },
    { path: 'misCurritos',canActivate:[AuthGuard], component: MisCurritosComponent },
    { path: 'curritos-solicitados',canActivate:[AuthGuard], component: SolicitadosComponent },
    { path: 'my-profile',canActivate:[AuthGuard], component: MiPerfilComponent },
    { path: 'opinions',canActivate:[AuthGuard], component: OpinionsComponent },
    { 
      path: 'notification',
      component: MessagesComponent,
      loadChildren: () => import('./messages/messages.module').then( m => m.MessagesModule ), canLoad:[AuthGuard]
    },
    { path: 'public-profile',canActivate:[AuthGuard], component: PublicProfileComponent },
    { path: '**', redirectTo: 'favorites' }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

