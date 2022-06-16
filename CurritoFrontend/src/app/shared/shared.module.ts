import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { FavoritesComponent } from '../profile/favorites/favorites.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CardAnuncioComponent } from './card-anuncio/card-anuncio.component';
import { FormsModule } from '@angular/forms';
import {BadgeModule} from 'primeng/badge';
import {RatingModule} from 'primeng/rating';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    SearchComponent,
    HeaderComponent,
    SubMenuComponent,
    CardAnuncioComponent   
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BadgeModule,
    RatingModule
  ],
  exports:[
    SidebarComponent,
    FooterComponent,
    SearchComponent,
    HeaderComponent,
    SubMenuComponent
  ]
})
export class SharedModule { }
