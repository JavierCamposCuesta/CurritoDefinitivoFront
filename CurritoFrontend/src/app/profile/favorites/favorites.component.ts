import { Byte } from '@angular/compiler/src/util';
import { Component, HostListener, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private anuncioService: AnuncioService, private usuarioService:UsuarioService) { }
  anunciosFavoritos:Anuncio[]=[];

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.cargarFavoritos()
  }

  /**
   * Metodo para cargar los anuncios favoritos, hace la llamada als servicio para ello
   */
  cargarFavoritos(){
    this.anuncioService.cargarFavoritos().subscribe({
      next:resp => {
        this.anunciosFavoritos = resp;
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
 * Metodo para borrar un anuncio de favoritos
 * @param anuncio 
 * @param evento 
 */
  quitarFavorito(anuncio: Anuncio, evento:any){
    this.anuncioService.borrarFavorito(anuncio).subscribe({
      next:resp => {
        evento.target.classList.add('bi-heart-fill')
        evento.target.classList.remove("bi-heart")
        this.cargarFavoritos();
     },
     error: error =>{
      
      
     }
    })
  }


  

}
