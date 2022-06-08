import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { OpinionsService } from 'src/app/services/opinions.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {

  constructor(private opinionsService: OpinionsService, private anuncioService: AnuncioService) { }

  ngOnInit(): void {
    window.scrollTo(0,0),
    this.mostrarOpiniones();
    
  }

  listaOpiniones: Comentario[]= [];

/**
   * Metodo para cargar las opiniones por trabajos realizados
   */
 mostrarOpiniones(){
  this.opinionsService.mostrarOpiniones().subscribe( resp => {
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
    return this.anuncioService.getImage(file);
  }






}
