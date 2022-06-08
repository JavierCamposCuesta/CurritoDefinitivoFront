import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Anuncio, Usuario } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-anuncio-detalle',
  templateUrl: './anuncio-detalle.component.html',
  styleUrls: ['./anuncio-detalle.component.css']
})
export class AnuncioDetalleComponent implements OnInit {

  constructor(private anuncioService: AnuncioService,
    private rutaActiva: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,) {}

  anuncioDetalle: Anuncio = {}
  usuarioRegistrado: Usuario={
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: '',
    ubicacion: ''
   };

  ngOnInit(): void {
    this.sacarParametroRuta();
    this.conseguirUsuarioRegistrado();
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

 

  cargarAnuncioDetalle(id: number){
   this.anuncioService.mostrarAnuncioDetalle(id).subscribe({
    next:resp => {
      this.anuncioDetalle = resp;
      
      
   },
   error: error =>{
    
   }
  })
  }

  sacarParametroRuta(){
    this.rutaActiva.params.subscribe((idRuta: any) => {
    this.cargarAnuncioDetalle(idRuta.id); 
  });
  }

  /**
   * Metodo que comprueba si el usuario esta logueado antes de solicitar un anuncio
   * @param anuncio 
   */
  solicitarCurritoComprobacion(anuncio: Anuncio){
    
    this.loginService.validarToken().subscribe({
         
      next:resp => {
        
       this.solicitarCurrito(anuncio);
        
     },
     error: error =>{
       
       this.router.navigate(['login'])
     }
   })
  }

  /**
   * Metodo para solicitar un anuncio, en caso de estar ya solicitado muestra un mensaje de advertencia
   * @param anuncio 
   */
  solicitarCurrito(anuncio: Anuncio){
    this.anuncioService.solicitarCurrito(anuncio).subscribe({
      next:resp => {
        this.mostrarMensajeAnuncioSolicitado();
        
        
     },
     error: error =>{
      this.mostrarAdvertenciaAnuncioYaSolicitado();
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


  //Mensajes
  /**
 * Este método muestra el mensaje rojo con el texto indicado si no ha sido posible borrar un anuncio
 */
   mostrarAdvertenciaAnuncioYaSolicitado() {
  this.messageService.add({severity:'info', summary: 'Info', detail: 'El anuncio ya estaba solicitado'});
}

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible borrar un anuncio
 */
 mostrarMensajeAnuncioSolicitado() {
  this.messageService.add({severity:'success', summary: 'Anuncio Solicitado', detail: 'El anuncio ha sido solicitado'});
}

}
