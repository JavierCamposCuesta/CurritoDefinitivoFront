import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Categoria, Data } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrl: string = environment.baseUrl; 
  constructor(private http: HttpClient) {}

  /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
  mostrarCategorias(){
    const url = `${this.baseUrl}/categorias`;
    
    return this.http.get<Data>(url);
  }
}