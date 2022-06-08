import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './messages/messages.component';
import { MisCurritosComponent } from './mis-curritos/mis-curritos.component';
import { OpinionsComponent } from './opinions/opinions.component';
import { RouterModule } from '@angular/router';
import { AddCurritoComponent } from './add-currito/add-currito.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import { ProfileComponent } from './profile.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { SolicitadosComponent } from './solicitados/solicitados.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RatingModule} from 'primeng/rating';
import { NotificationComponent } from './messages/notification/notification.component';
import { ChatsComponent } from './messages/chats/chats.component';
import { MessagesModule } from './messages/messages.module';




@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    ProfileComponent,
    MisCurritosComponent,
    OpinionsComponent,
    AddCurritoComponent,
    MiPerfilComponent,
    PublicProfileComponent,
    SolicitadosComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    CardModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    ConfirmDialogModule,
    RatingModule
    
  ],
  exports: [
  ],
  providers: [MessageService]
})
export class ProfileModule { }
