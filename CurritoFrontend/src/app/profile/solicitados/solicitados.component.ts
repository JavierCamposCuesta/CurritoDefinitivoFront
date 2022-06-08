import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-solicitados',
  templateUrl: './solicitados.component.html',
  styleUrls: ['./solicitados.component.css']
})
export class SolicitadosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService) { }

  ngOnInit(): void {
    this.misAnunciosRealizados();
    this.misAnunciosSolicitados();
  }

  listaMisAnunciosSolicitados:Anuncio[]=[];
  listaMisAnunciosRealizados:Anuncio[]=[];
  first = 0;

  rows = 10;


  /**
   * Metodo para cargar los anuncios solicitados
   */
  misAnunciosSolicitados(){
    this.anuncioService.misAnunciosSolicitados().subscribe( resp => {
      this.listaMisAnunciosSolicitados=resp;
      
    })
  }

  /**
   * Metodo para cargar los anuncios realizados
   */
  misAnunciosRealizados(){
    this.anuncioService.misAnunciosRealizados().subscribe( resp => {
      this.listaMisAnunciosRealizados=resp;
      
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
