import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnunciosOfertadosComponent } from './anuncios-ofertados/anuncios-ofertados.component';
import { OpinionesComponent } from './opiniones/opiniones.component';
import { InformacionComponent } from './informacion/informacion.component';
import {RatingModule} from 'primeng/rating';
import { PublicProfileComponent } from './public-profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PublicProfileRoutingModule } from './public-profile-routing.module';




@NgModule({
  declarations: [
    AnunciosOfertadosComponent,
    OpinionesComponent,
    InformacionComponent,
    PublicProfileComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    RouterModule,
    FormsModule,
    PublicProfileRoutingModule
  ]
})
export class PublicProfileModule { }
