import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  constructor(private usuarioService : UsuarioService,private rutaActiva: ActivatedRoute) { }

  usuarioPerfil: Usuario = {};

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.sacarParametroRuta();
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
