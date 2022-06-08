import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-card-recientes',
  templateUrl: './card-recientes.component.html',
  styleUrls: ['./card-recientes.component.css']
})
export class CardRecientesComponent implements OnInit {

  constructor(private anuncioService : AnuncioService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.cargarAnunciosRecientes();
  }

  anunciosRecientes:Anuncio[]=[];

  /**
   * Metodo que hace la llamada para cargar los anuncios recientes
   */
  cargarAnunciosRecientes(){
    this.anuncioService.cargarAnunciosRecientes().subscribe({
          
      next:resp => {
        this.anunciosRecientes = resp;
        this.anunciosRecientes.splice(9)
        
     },
     error: error =>{
      
     }
  
     
     
     
   })
  }

/**
 * Metodo para añadir anuncio a favorito, lo primero que hace es comprobar que el usuario esta logueado, posteriormente 
 * comprueba la clase del icono de favoritos, segun cual sea llama a un método u otro
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
 * Metodo para añadir un anuncio a favorito, lo que hacemos es llamar al metodo del servicio e intercambiar las clases del icono de favorito
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
 * Metodo para eliminar un anuncio de favoritos, intercambia las clases del icono de favoritos segun se elimine o no
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
