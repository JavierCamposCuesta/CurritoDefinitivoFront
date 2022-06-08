import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Comentario, Usuario } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() busqueda: string='';
  // @Output() onEnter: EventEmitter<string> = new EventEmitter();
  // busqueda2: string = "";
   usuarioRegistrado: Usuario={
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: '',
    ubicacion: ''
   };

   listaNotificaciones: Comentario[]= [];
  
  constructor(private anuncioService:AnuncioService, private router: Router, private loginService:LoginService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.conseguirUsuarioRegistrado();
    console.log(this.listaNotificaciones)
  }

  conseguirUsuarioRegistrado(){
    this.loginService.validarToken().subscribe({
        
      next:resp => {
        this.usuarioRegistrado = resp;
        this.conseguirNotificacionesUsuarioRegistrado(resp);
     },
     error: error =>{
     }
   })
  }

  conseguirNotificacionesUsuarioRegistrado(usuario: Usuario){
    this.notificationService.cargarNotificaciones(usuario).subscribe({
        
      next:resp => {
        this.listaNotificaciones = resp;
        console.log(this.listaNotificaciones)
     },
     error: error =>{
     }
   })
  }

}
