import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService,
    private anuncioService: AnuncioService) { }

  ngOnInit(): void {
    this.conseguirUsuarioRegistrado();
  }

  usuarioRegistrado: Usuario={};

  /**
   * Método para cerrar sesión
   */
  cerrarSesion(){
    localStorage.removeItem("jwt");
    this.router.navigate(["home"])
  }

  conseguirUsuarioRegistrado(){
    this.loginService.validarToken().subscribe({
        
      next:resp => {
        this.usuarioRegistrado = resp;
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
    return this.anuncioService.getImage(file);
  }

}
