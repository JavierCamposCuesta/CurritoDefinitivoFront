import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // @Output() onEnter: EventEmitter<string> = new EventEmitter();
  busqueda: string = "";
  constructor(private eventBus: NgEventBus, private router: Router) { }

  ngOnInit(): void {
  }

   buscar(){
    // this.onEnter.emit(this.busqueda);
//Aqui lanzamos el evento al que llamamos app:search y le pasamos la busqueda

  this.router.navigate([`anuncio/${this.busqueda}`])
  // this.eventBus.cast('app:search',    this.busqueda);
  }

  

}
