import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../interfaces/interface';
import { UsuarioService } from '../services/usuario.service';
import { AnunciosOfertadosComponent } from './anuncios-ofertados/anuncios-ofertados.component';
import { InformacionComponent } from './informacion/informacion.component';
import { OpinionesComponent } from './opiniones/opiniones.component';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  constructor(private usuarioService : UsuarioService,private rutaActiva: ActivatedRoute) { }

  usuarioPerfil: Usuario = {};
  

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.sacarParametroRuta();
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
   * Metodo para conseguir el usuario que está logueado
   */

 cargarUsuarioPerfil(id: number){
  this.usuarioService.mostrarUsuarioPerfil(id).subscribe({
   next:resp => {
     this.usuarioPerfil = resp;
  },
  error: error =>{
   
  }
 })
 }

 sacarParametroRuta(){
  this.rutaActiva.params.subscribe((idRuta: any) => {
  this.cargarUsuarioPerfil(idRuta.id); 
});
}


}
