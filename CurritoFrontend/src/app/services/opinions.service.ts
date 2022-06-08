import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Comentario } from '../interfaces/interface';

@Injectable({
    providedIn: 'root'
  })
  export class OpinionsService {
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
   * Método para pedir todas las opiniones
   * @returns lista con todas las opiniones
   */
     mostrarOpiniones(){
        const url = `${this.baseUrl}/profile/opiniones`;
    
        const headers = this.cargarHeaders();
          return this.http.get<Comentario[]>(url, {headers});
        
      }

    /**
   * Método para subir nuevo comentario
   * @param user 
   * @returns Un observable con el resultado de la petición
   */
  subirComentario(idComentario:number, textoComentario: string, puntuacionEstrellas: number){
    const url = `${this.baseUrl}/profile/nuevo-comentario`;
    const headers = this.cargarHeaders();
    
    const formData: FormData = new FormData();
    formData.append('idComentario', idComentario.toString());
    formData.append('textoComentario', textoComentario);
    formData.append('puntuacionEstrellas', puntuacionEstrellas.toString());
      return this.http.put<any>(url, formData, {headers});
  }

    
}