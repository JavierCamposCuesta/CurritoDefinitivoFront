import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './services/auth-guard.service';
import { RouterLink, RouterModule } from '@angular/router';
import { ProfileModule } from './profile/profile.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AnuncioModule } from './anuncio/anuncio.module';
import { NgEventBus } from 'ng-event-bus';  // https://www.npmjs.com/package/ng-event-bus
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from './profile/messages/messages.module';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    AuthModule,
    RouterModule,
    ProfileModule,
    BrowserAnimationsModule,
    AnuncioModule,
    FormsModule,
    AppRoutingModule,
    ConfirmDialogModule,
    MessagesModule
  ],
  providers: [AuthGuard,
  NgEventBus],
  bootstrap: [AppComponent]
})
export class AppModule { }
