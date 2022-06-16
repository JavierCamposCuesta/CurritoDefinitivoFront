import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/interfaces/interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})
export class OpinionesComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute, private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.sacarParametroRuta();
  }

  listaOpiniones:Comentario[]=[];

  /**
   * Con este metodo sacamos el id del usuario de la ruta
   */
  sacarParametroRuta(){
    this.rutaActiva.params.subscribe((idRuta: any) => {
      this.mostrarOpiniones(idRuta.id);
  });
  }

 /**
   * Metodo para cargar las opiniones por trabajos realizados
   */
  mostrarOpiniones(id: number){
    this.usuarioService.mostrarOpinionesUsuario(id).subscribe( resp => {
      for(var opinion of resp){
        if(opinion.realizado == true){
          this.listaOpiniones.push(opinion);
        }
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

}
