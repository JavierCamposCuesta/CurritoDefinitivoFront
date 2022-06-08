import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, last, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Categoria } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {
  private baseUrl: string = environment.baseUrl; 
  constructor(private http: HttpClient) {}

  /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
  mostrarCategorias(){
    const url = `${this.baseUrl}/categorias`;
    
    return this.http.get<Categoria[]>(url);
  }

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