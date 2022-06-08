import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';
import { ChatsComponent } from './chats/chats.component';
import { NotificationComponent } from './notification/notification.component';



const routes: Routes = [
    { path: 'chats',canActivate:[AuthGuard], component: ChatsComponent },
    { path: '',canActivate:[AuthGuard], component: NotificationComponent },
    { path: '**', redirectTo: 'notification' }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }

