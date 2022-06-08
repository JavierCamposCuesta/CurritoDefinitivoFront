import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Método para cerrar sesión
   */
  cerrarSesion(){
    localStorage.removeItem("jwt");
    this.router.navigate(["home"])
  }

}
