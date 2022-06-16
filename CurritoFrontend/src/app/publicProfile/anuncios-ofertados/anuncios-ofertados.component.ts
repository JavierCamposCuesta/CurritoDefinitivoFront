import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio, Usuario } from 'src/app/interfaces/interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Byte } from '@angular/compiler/src/util';
import { LoginService } from 'src/app/services/login.service';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-anuncios-ofertados',
  templateUrl: './anuncios-ofertados.component.html',
  styleUrls: ['./anuncios-ofertados.component.css']
})
export class AnunciosOfertadosComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute, private usuarioService : UsuarioService,
    private loginService: LoginService, private anuncioService: AnuncioService, private router: Router) { }
  anunciosOfertados:Anuncio[] = [];


  ngOnInit(): void {
    this.sacarParametroRuta();
  }

  sacarParametroRuta(){
    this.rutaActiva.params.subscribe((idRuta: any) => {
      this.mostrarAnunciosOfertados(idRuta.id);
  });
  }

  mostrarAnunciosOfertados(id: number){
    this.usuarioService.mostrarAnunciosOfertadosPerfil(id).subscribe({
      next:resp => {
        this.anunciosOfertados = resp;
     },
     error: error =>{
      
     }
    })
  }

/**
   * Método que llama a getImage del servicio y transforma un array de bytes en una url correspondiente a una imagen
   * @param file
   * @returns
   */
 getImage(file: Byte[]) {
  return this.usuarioService.getImage(file);
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

}
