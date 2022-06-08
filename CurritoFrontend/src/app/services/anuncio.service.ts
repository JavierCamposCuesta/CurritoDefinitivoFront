import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Anuncio, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {
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
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
  misAnuncios(){
    const url = `${this.baseUrl}/profile/mis-anuncios`;

    const headers = this.cargarHeaders();
      return this.http.get<Anuncio[]>(url, {headers});
    
  }

  /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
   misAnunciosTerminados(){
    const url = `${this.baseUrl}/profile/mis-anuncios-terminados`;

    const headers = this.cargarHeaders();
      return this.http.get<Anuncio[]>(url, {headers});
    
  }

   /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
    misAnunciosSolicitados(){
      const url = `${this.baseUrl}/profile/mis-anuncios-solicitados`;
  
      const headers = this.cargarHeaders();
        return this.http.get<Anuncio[]>(url, {headers});
      
    }

     /**
   * Método para pedir todas las categorias
   * @returns lista con todas las categorias
   */
   misAnunciosRealizados(){
    const url = `${this.baseUrl}/profile/mis-anuncios-realizados`;

    const headers = this.cargarHeaders();
      return this.http.get<Anuncio[]>(url, {headers});
    
  }

  /**
   * Método para registrar usuarios, recibe un usuario y lanza la peticion a la API
   * @param user 
   * @returns Un observable con el resultado de la petición
   */
 addAnuncio(anuncio:Anuncio, file:File | undefined){
  const url = `${this.baseUrl}/anuncio`;
  const headers = this.cargarHeaders();

  const formData: FormData = new FormData();
    formData.append('file', file!);
    formData.append('titulo', anuncio.titulo!);
    formData.append('categoria', anuncio.categoria!);
    formData.append('precio', anuncio.precio!.toString());
    formData.append('tipoPrecio', anuncio.tipoPrecio!);
    formData.append('descripcion', anuncio.descripcion!);
    formData.append('ubicacion', anuncio.ubicacion!);

    return this.http.post(url, formData, {headers});
}

 /**
   * Método para registrar usuarios, recibe un usuario y lanza la peticion a la API
   * @param user 
   * @returns Un observable con el resultado de la petición
   */
  editAnuncio(anuncio:Anuncio, file:File){
    const url = `${this.baseUrl}/anuncio/${anuncio.id}`;
    const headers = this.cargarHeaders();

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('titulo', anuncio.titulo!);
    formData.append('categoria', anuncio.categoria!);
    formData.append('precio', anuncio.precio!.toString());
    formData.append('tipoPrecio', anuncio.tipoPrecio!);
    formData.append('descripcion', anuncio.descripcion!);
    formData.append('ubicacion', anuncio.ubicacion!);

      return this.http.put(url, formData, {headers});
  }

  /**
   * Metodo para borrar un anuncio, le pasamos el id del anuncio a borrar y hará la llamada a la API
   * @param idAnuncio 
   * @returns 
   */
  borrarAnuncio(idAnuncio:number){
    const url = `${this.baseUrl}/anuncio/${idAnuncio}`;
    const headers = this.cargarHeaders();
      return this.http.delete(url, {headers});
  }

  // /**
  //  * Método para marcar un anuncio como finalizado, le pasamos el id del anuncio y hará la llamada correspondiente a la API
  //  * @param idAnuncio 
  //  * @returns 
  //  */
  // finalizarAnuncio(idAnuncio: number){
  //   const url = `${this.baseUrl}/anuncio/${idAnuncio}/finalizar-anuncio`;
  //   const headers = this.cargarHeaders();
  //     return this.http.get(url, {headers});
  // }
    /**
   * Método para marcar un anuncio como finalizado, le pasamos el id del anuncio y hará la llamada correspondiente a la API
   * @param idAnuncio 
   * @returns 
   */
     finalizarAnuncio(idAnuncio: number, emailSolicitante: string, textoComentario: string, puntuacionEstrellas: number){
      console.log(emailSolicitante)
      const url = `${this.baseUrl}/anuncio/${idAnuncio}/finalizar-anuncio`;
      const headers = this.cargarHeaders();
      const formData: FormData = new FormData();
      formData.append('emailSolicitante', emailSolicitante);
      formData.append('textoComentario', textoComentario);
      formData.append('puntuacionEstrellas', puntuacionEstrellas.toString());
        return this.http.put(url, formData, {headers});
    }
  

  cargarListaSolicitantes(idAnuncio: number){
    const url = `${this.baseUrl}/anuncio/${idAnuncio}/solicitantes`;
    return this.http.get<Usuario[]>(url);
  }

  // asignarAnuncioSolicitante(emailSolicitante: string, idAnuncio: number){
  //   const url = `${this.baseUrl}/anuncio/${idAnuncio}/solicitante/${emailSolicitante}`;
  //   const headers = this.cargarHeaders();
  //     return this.http.put(url, anuncio, {headers});
  // }

  solicitanteAddAnuncio(idAnuncio: number, emailSolicitante: string){
    console.log(emailSolicitante)
    const url = `${this.baseUrl}/anuncio/${idAnuncio}/finalizar-anuncio/${emailSolicitante}`;
    const headers = this.cargarHeaders();
      return this.http.get(url, {headers});
  }

  /**
   * Método para cargar los anuncios recientes
   * @returns 
   */
  cargarAnunciosRecientes(){
      const url = `${this.baseUrl}/anuncios/anuncios-recientes`;
      return this.http.get<Anuncio[]>(url);
  }

  /**
   * Método para realizar las busqueda de anuncios, hará una llamada a la API con todos los parámetros y recibira una lista de anuncios
   * con los anuncios que se correspondan con los filtros seleccionados
   * @param termino 
   * @param categoria 
   * @param rangoPrecio 
   * @param orden 
   * @returns 
   */
  buscarAnuncio(termino: string, categoria:string, rangoPrecio:number[], orden:string){
    const url = `${this.baseUrl}/anuncios/?termino=${termino}&categoria=${categoria}&rangoPrecio=${rangoPrecio}&orden=${orden}`;
    return this.http.get<Anuncio[]>(url);
  }

  /**
   * Metodo para añadir un anuncio a favoritos, le pasamos un anuncio
   * @param anuncio 
   * @returns 
   */
  addFavorito(anuncio: Anuncio){
    const url = `${this.baseUrl}/favoritos`;
    
    const headers = this.cargarHeaders();
      return this.http.post(url, anuncio, {headers});
  }

  /**
   * Método para borrar un anuncio de favoritos, le pasamos un anuncio, pero solo enviamos el id del anuncio en la peticion
   * @param anuncio 
   * @returns 
   */
  borrarFavorito(anuncio: Anuncio){
    const url = `${this.baseUrl}/favoritos/${anuncio.id}`;
    const headers = this.cargarHeaders();
      return this.http.delete(url, {headers});
  }

  /**
   * Método para cargar los anuncios que estan en favoritos
   * @returns 
   */
  cargarFavoritos(){
    const url = `${this.baseUrl}/favoritos`;
    const headers = this.cargarHeaders();
      return this.http.get<Anuncio[]>(url, {headers});
  }

  // recogerTermino(termino: string){
  //   this.termino = termino;
  // }

  

  // darListaAnuncios(){
  //   return this.listaAnuncios;
  // }


/**
 * Método para mostrar un anuncio concreto, le pasamos un id de anuncio y hara la llamada a la API, la cual nos dará el anuncio correspondiente
 * o un error
 * @param id 
 * @returns 
 */
mostrarAnuncioDetalle(id: any){
  
  const url = `${this.baseUrl}/anuncio/${id}`;
  return this.http.get<Anuncio>(url);
}

/**
 * Método para solicitar un anuncio, le pasamos el anuncio que queremos solicitar
 * @param anuncio 
 * @returns 
 */
solicitarCurrito(anuncio: Anuncio){
  const url = `${this.baseUrl}/anuncios-solicitados`;
  const headers = this.headers;
  return this.http.post(url, anuncio, {headers});
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

}