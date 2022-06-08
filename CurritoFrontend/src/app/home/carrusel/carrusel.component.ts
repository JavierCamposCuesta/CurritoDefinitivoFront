import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria, Data } from '../../interfaces/interface';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  images: any; 
  responsiveOptions;
  listaCategorias:Data={
    data:[],
    page:0,
    limit:0
  };

  constructor(private categoriaService: CategoriaService) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 6,
            numScroll: 3,
            
        },
        {
            breakpoint: '768px',
            numVisible: 4,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 2,
            numScroll: 1
        }
    ];
  }

  ngOnInit(): void {
      this.mostrarCategorias();
    }
    
    /**
     * Metodo para mostrar la lista de categorias, la cual la recibe del servicio categoriaService
     */
    mostrarCategorias(){
        this.categoriaService.mostrarCategorias()
        .subscribe( resp => {
          this.listaCategorias=resp;
        })
    }


  
  
  


}
