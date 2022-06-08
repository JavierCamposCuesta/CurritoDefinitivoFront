import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { MessageService, SharedModule } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {RatingModule} from 'primeng/rating';
import { NotificationComponent } from './notification/notification.component';
import { ChatsComponent } from './chats/chats.component';
import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';




@NgModule({
  declarations: [
    NotificationComponent,
    ChatsComponent,
    MessagesComponent
   
  ],
  imports: [
    CommonModule,
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
    RatingModule,
    MessagesRoutingModule,
    
  ],
  exports: [
  ],
  providers: [MessageService]
})
export class MessagesModule { }
