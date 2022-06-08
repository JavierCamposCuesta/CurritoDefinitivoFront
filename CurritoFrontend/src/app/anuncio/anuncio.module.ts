import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAnuncioComponent } from './card-anuncio/card-anuncio.component';
import { AnuncioComponent } from './anuncio.component';
import { MessageService, SharedModule } from 'primeng/api';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';
import {SliderModule} from 'primeng/slider';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import { AnuncioDetalleComponent } from './anuncio-detalle/anuncio-detalle.component';
import { AppRoutingModule } from '../app-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';





@NgModule({
  declarations: [
    CardAnuncioComponent,
    AnuncioComponent,
    AnuncioDetalleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OverlayPanelModule,
    FormsModule,
    SliderModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    ButtonModule,
    AppRoutingModule,
    DialogModule,
    ToastModule
    

  ],
  exports: [
    AnuncioComponent
  ],

  providers: [MessageService]
})
export class AnuncioModule { }
