import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from './carrusel/carrusel.component';
import { CardRecientesComponent } from './card-recientes/card-recientes.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {Carousel, CarouselModule} from 'primeng/carousel';




@NgModule({
  declarations: [
    CarruselComponent,
    CardRecientesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule
  ],
  exports:[
    CarruselComponent,
    CardRecientesComponent,
    HomeComponent
  ]
})
export class HomeModule { }
