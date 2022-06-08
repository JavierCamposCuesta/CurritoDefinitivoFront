import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Comentario, Usuario } from '../interfaces/interface';

@Injectable({
    providedIn: 'root'
  })
  export class NotificationService {
    private baseUrl: string = environment.baseUrl; 
  
     private headers = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
      
  
  
  
    constructor(private http: HttpClient) {}
  
    /**
     * Método que actualiza el header con el token de localStorage
     * @returns 
     */
    cargarHeaders(){
      return  new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
    }

    /**
   * Método para pedir todas las notificaciones
   * @returns lista con todas las notificiaciones
   */
     cargarNotificaciones(usuario: Usuario){
        const url = `${this.baseUrl}/profile/notification`;
    
        const headers = this.cargarHeaders();
          return this.http.get<Comentario[]>(url, {headers});
        
      }

      /**
   * Método para pedir todas las notificaciones
   * @returns lista con todas las notificiaciones
   */
       conseguirComentariosPendientes(){
      const url = `${this.baseUrl}/profile/opiniones-pendientes`;
  
      const headers = this.cargarHeaders();
        return this.http.get<Comentario[]>(url, {headers});
      
    }

      

    
}