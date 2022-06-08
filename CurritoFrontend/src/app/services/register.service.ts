import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRespuesta, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  /**
   * Método para registrar usuarios, recibe un usuario y lanza la peticion a la API
   * @param user 
   * @returns Un observable con el resultado de la petición
   */
  register(user:Usuario){
    const url = `${this.baseUrl}/register`;
      return this.http.post<LoginRespuesta>(url, user);
  }

  verificarUsuario(email: string){
    const url = `${this.baseUrl}/verification`;
      return this.http.post<number>(url, email);
  }
}