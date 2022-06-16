import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnunciosOfertadosComponent } from './anuncios-ofertados/anuncios-ofertados.component';
import { InformacionComponent } from './informacion/informacion.component';
import { OpinionesComponent } from './opiniones/opiniones.component';



const routes: Routes = [
    { path: '',component: AnunciosOfertadosComponent },
    { path: 'informacion/:id', component: InformacionComponent },
    { path: 'anuncios-ofertados/:id', component: AnunciosOfertadosComponent },
    { path: 'opiniones/:id', component: OpinionesComponent },
    { path: '**', redirectTo: 'anuncios-ofertados' }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicProfileRoutingModule { }

