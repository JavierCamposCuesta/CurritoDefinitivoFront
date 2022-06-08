import { Component, Input, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { NgEventBus } from 'ng-event-bus';
import { ActivatedRoute, Data, Params, Router, UrlTree } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';

import { SelectItem, PrimeNGConfig } from 'primeng/api';
import {SelectButtonModule} from 'primeng/selectbutton';
import { LoginService } from 'src/app/services/login.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Byte } from '@angular/compiler/src/util';


@Component({
  selector: 'app-card-anuncio',
  templateUrl: './card-anuncio.component.html',
  styleUrls: ['./card-anuncio.component.css']
})
export class CardAnuncioComponent implements OnInit {

  
  constructor(private anuncioService:AnuncioService, private eventBus: NgEventBus, private rutaActiva: ActivatedRoute, private categoriaService: CategoriaService
    , private primeNGConfig: PrimeNGConfig, private selectButtonModule: SelectButtonModule,
    private loginService: LoginService,
    private router: Router) { 
      
      this.paymentOptions = [
        { name: 'Por Horas', value: 1 },
        { name: 'Total', value: 2 }
      ];
      
    }
    
  paymentOptions: any[];

  value2: number=0;
  listaAnuncios:Anuncio[]=[];

  //Variables filtrado
  listaCategorias:any[]=[];
  rangoPrecio:number[] = [0,5000];
  categoria:string='Todas las categorias';
  tipoOrden: string= "Novedades";

 
  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
    this.cargarCategorias();

    this.sacarParametroRuta(this.categoria, this.rangoPrecio, this.tipoOrden);

  
  }

  
/**
 * Metodo para mostrar la lista de categorias, la cual la recibe del servicio categoriaService
 */
 cargarCategorias(){
  this.categoriaService.mostrarCategorias()
  .subscribe( resp => {
    this.listaCategorias=resp.data;
    
  })
}

// sacarParametroRuta(){
//   this.rutaActiva.params.subscribe((search: any) => {
//     this.busquedaAnuncios(search)
// });
// }

sacarParametroRuta(categoria:string, rangoPrecio:number[], tipoOrden:string){
  this.rutaActiva.params.subscribe((search: any) => {
    this.busquedaAnuncios(search, categoria, rangoPrecio, tipoOrden)
});
}


  busquedaAnuncios(search: any, categoria:string, rangoPrecio:number[], tipoOrden:string){
    let termino:string  = search.termino;

    this.anuncioService.buscarAnuncio(termino, categoria, rangoPrecio, tipoOrden).subscribe({
         
         next:resp => {
           this.listaAnuncios = resp;
          
        },
        error(error){
        }
      })
 }

 filtrarCategoria(categoria:string){
   this.categoria = categoria;
   this.sacarParametroRuta(this.categoria, this.rangoPrecio, this.tipoOrden);
 }

 filtrarPrecio(){
  this.sacarParametroRuta(this.categoria, this.rangoPrecio, this.tipoOrden);
}

filtrarPorOrden(tipoOrden: string){
  this.tipoOrden = tipoOrden;
  this.sacarParametroRuta(this.categoria, this.rangoPrecio, this.tipoOrden);
}


/**
 * Metodo para añadir un anuncio a favorito, lo hace comprobando la clase del icono de favoritos, primero comprueba si el usuario
 * esta logueado, en caso de no estarlo lo redirige al login
 * @param anuncio 
 * @param evento 
 */
addFavoritos(anuncio:Anuncio, evento:any) {
 
  
  
   this.loginService.validarToken().subscribe({
         
    next:resp => {

      if(evento.target.classList.contains("bi-heart-fill")){
        
        this.borrarFavorito(anuncio,evento)
      }
      else{
        
        this.addFavoritosEstaLogueado(anuncio, evento)
      }
      
   },
   error: error =>{
     
     this.router.navigate(['login'])
   }
 })
}

/**
 * Metodo para añadir el anuncio a favoritos, visualmente cambia las clases del icono de favoritos
 * @param anuncio 
 * @param evento 
 */
addFavoritosEstaLogueado(anuncio: Anuncio, evento:any){
  this.anuncioService.addFavorito(anuncio).subscribe({
    next:resp => {
      evento.target.classList.remove('bi-heart')
      evento.target.classList.add("bi-heart-fill")
   },
   error: error =>{
    
    evento.target.classList.remove('bi-heart')
      evento.target.classList.add("bi-heart-fill")
    
   }
  })
  
}

/**
 * Metodo para borrar el anuncio de favoritos, visualmente cambia las clases del icono de favoritos
 * @param anuncio 
 * @param evento 
 */
borrarFavorito(anuncio: Anuncio, evento:any){
  this.anuncioService.borrarFavorito(anuncio).subscribe({
    next:resp => {
      evento.target.classList.add('bi-heart')
        evento.target.classList.remove("bi-heart-fill")
      
   },
   error: error =>{
     
    evento.target.classList.remove('bi-heart')
      evento.target.classList.add("bi-heart-fill")
    
   }
  })
}

/**
   * Método que llama a getImage del servicio y transforma un array de bytes en una url correspondiente a una imagen
   * @param file 
   * @returns 
   */
 getImage(file: Byte[]) {
  return this.anuncioService.getImage(file);
}

 
  
  

}
