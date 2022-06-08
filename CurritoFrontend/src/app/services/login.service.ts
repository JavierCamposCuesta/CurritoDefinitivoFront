import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRespuesta, Usuario } from '../interfaces/interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

private baseUrl: string = environment.baseUrl;
private estado: boolean = false;

  constructor( private http: HttpClient, private router:Router ) { }

  /**
   * Método para hacer login, recibe un email y un password y realiza la llamada a la API
   * @param email 
   * @param password 
   * @returns respuesta personalizada, en caso de hacer login devolverá el token
   */
  login(email:string, password:string): Observable<LoginRespuesta>{
    const url = `${this.baseUrl}/login`;
    
    const body = {
      
        "email": email,
        "password": password
    
    }
  
    
    return this.http.post<LoginRespuesta>(url, body);
  }

  /**
   * Método para mostrar el token que hay almacenado en el localStorage
   * @returns 
   */
  getToken() {
    
    return localStorage.getItem("jwt");
  }


  /**
   * Método para validar el token del localStorage
   * @returns 
   */
  validarToken():Observable<Usuario>{
    const url = `${ this.baseUrl }/comprobarToken`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );

    return this.http.get<Usuario>( url, { headers } )
  }



  
  


}
