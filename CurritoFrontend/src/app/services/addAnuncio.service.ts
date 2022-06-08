import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Anuncio } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class addAnuncioService {
  private baseUrl: string = environment.baseUrl; 
  constructor(private http: HttpClient) {}

/**
   * Método para registrar usuarios, recibe un usuario y lanza la peticion a la API
   * @param user 
   * @returns Un observable con el resultado de la petición
   */
//  addAnuncio(anuncio:Anuncio){
//     const url = `${this.baseUrl}/anuncio`;
//     const headers = new HttpHeaders()
//       .set('Authorization', `Bearer ${localStorage.getItem('jwt')}` || '' );
//       return this.http.post(url, anuncio, {headers});
//   }

  upload(file:File){
    // Crear formdata y agregar los datos a formdataz
    let formData = new FormData();
    formData.append("file",file);
                // Crea el objeto HttpRequest original
                // Establezca reportProgress en true para monitorear los eventos de carga de archivos
    const req = new HttpRequest('POST', `${environment.baseUrl}/files`, formData, {
        reportProgress: true,
        responseType: 'json'
        });

  
    console.log(formData)
    return this.http.request(req);
}
}