import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl: string = environment.baseUrl;

  private headers = new HttpHeaders()
     .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );


constructor(private http: HttpClient) { }

/**
   * Método que actualiza el header con el token de localStorage
   * @returns
   */
 cargarHeaders(){
  return  new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
}

  /**
 * Método para convertir un array de bytes en una url correspondiente a una imagen
 * @param file El parametro de tipo byte que le pasamos para que lo convierta en una url
 * @returns url | null
 */
   getImage(file: Byte[]) {
    if(file != null){
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(file))
      );
      const source = `data:image/png;base64,${base64String}` + file;
      return source;
    }
    else{
      return null;
    }
  }

  updateProfile(user:Usuario, file:any, idUsuario:string){
    let url = `${this.baseUrl}/profile/update/${idUsuario}`;

    if (file==="NotSelected") {
      url = `${this.baseUrl}/profile/updateDefaultImage/${idUsuario}`;
    }

    const headers = this.cargarHeaders();
    const formData: FormData = new FormData();
      formData.append('imagenProfile', file);
      formData.append('nombre', user.nombre!);
      formData.append('apellidos', user.apellidos!);
      formData.append('telefono', user.telefono!);
      formData.append('ubicacion', user.ubicacion!);

      console.log("fsdf")
      return this.http.put<Usuario>(url, formData, {headers});
  }

  updatePass(passEdit:any){
    let url = `${this.baseUrl}/profile/updatePass`;


    const headers = this.cargarHeaders();
    const formData: FormData = new FormData();
      formData.append('passwordOld', passEdit.passwordOld);
      formData.append('passwordNew', passEdit.passwordNew);
      formData.append('passwordNew2', passEdit.passwordNew2);

      return this.http.put<Usuario>(url, formData, {headers});
  }


}
