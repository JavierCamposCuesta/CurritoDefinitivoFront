import { Component, Input, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { Anuncio, Categoria, Usuario } from '../../interfaces/interface';
import {ConfirmationService, MessageService} from 'primeng/api';
import { PrimeNGConfig, Message } from 'primeng/api';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Byte } from '@angular/compiler/src/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-mis-curritos',
  templateUrl: './mis-curritos.component.html',
  styleUrls: ['./mis-curritos.component.css'],
  providers: [ConfirmationService]
})


export class MisCurritosComponent implements OnInit {
  constructor(private anuncioService: AnuncioService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private categoriaService: CategoriaService,  
    private confirmationService: ConfirmationService,
    private fb: FormBuilder) { }
  
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.misAnuncios();
    this.misAnunciosTerminados();
    this.primengConfig.ripple = true;
    this.cargarCategorias();

    this.formComentario.reset({
      textoComentario: '',
      puntuacionEstrellas: 3
    })
  }
  
  listaMisAnuncios:Anuncio[]=[];
  listaMisAnunciosTerminados:Anuncio[]=[];
  listaSolicitantes:Usuario[]=[];
  anuncioSeleccionado:Anuncio={};
  //Con este atributo ocultamos o desolcultamos el componente de editar el anuncio
  dialogoVisible:boolean = false;
  first = 0;
  
  rows = 10;
  listaCategorias:Categoria[]=[];
  msgs: Message[] = [];
  displayBasic2: boolean = false;
  dialogoComentario: boolean = false;
  foto: string = "";
  anuncioComentar: Anuncio={};
  solicitante: Usuario = {};
  
  formComentario: FormGroup = this.fb.group({
    textoComentario: ['', [Validators.required]],
    puntuacionEstrellas: [3, [ Validators.required]  ]
    
  })

  /**
   * Método para hacer la llamada y que cargue las categorias
   */
  cargarCategorias(){
    this.categoriaService.mostrarCategorias().subscribe(resp =>{
      this.listaCategorias = resp.data;
    })
  }
  

  /**
   * Este método resuelve la peticion de anuncioService, la cual dará una lista de anuncios que cargamos en la variable listaMisAnuncios
   */
  misAnuncios(){
    this.dialogoVisible = false;
    this.anuncioService.misAnuncios().subscribe( resp => {
      this.listaMisAnuncios=resp;
      

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

   /**
   * Este método resuelve la peticion de anuncioService, la cual dará una lista de anuncios terminados que cargamos en la variable listaMisAnunciosTerminados
   */
    misAnunciosTerminados(){
      this.anuncioService.misAnunciosTerminados().subscribe({
          
        next:resp => {
          this.listaMisAnunciosTerminados=resp;
       },
       error:error =>{
        
       }
     })
    }

  /**
   * Este método se lanza cuando se pulsa el boton de editar un anuncio
   * @param anuncio 
   */
  seleccionarEventoEditar(anuncio:Anuncio){
    this.mostrarFormulario();
    this.anuncioSeleccionado = anuncio;
  }

  /**
   * Este evento es para mostrar la ventana emergente con el anuncio a editar
   */
  mostrarFormulario() {
    this.dialogoVisible = !this.dialogoVisible;
}

/**
 * Este método borrará un anuncio, le pasamos un id de anuncio por parámatro y resuelve la petición de anuncioService, en el caso de que 
 * se borre el anuncio se llamará al método correspondiente para que se muestre el mensaje adecuado
 * @param idAnuncio 
 */
 borrarAnuncio(idAnuncio:number){
  
   this.anuncioService.borrarAnuncio(idAnuncio).subscribe(
    resp => {
       this.showSuccess()
       this.misAnuncios()
      //  setTimeout(function() {window.location.reload()}, 1000)
       
      },error => {
        this.showError();
      })
      // window.location.reload();
  
}

confirm1(idAnuncio: number) {
  this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar el anuncio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
          this.msgs = [{severity:'info', summary:'Confirmar', detail:'Has borrado el anuncio', }];
          this.borrarAnuncio(idAnuncio);
      },
      reject: () => {
          this.msgs = [{severity:'info', summary:'Cancelar', detail:'Anuncio no borrado'}];
      }
  });
}



// /**
//  * Este metodo se llamará cuando se pulse el boton de finalizar anuncio, se llamará al servicio de anuncio y segun la respuesta se 
//  * mostrará el mensaje correspondiente
//  * @param idAnuncio 
//  */
// finalizarAnuncio(idAnuncio: number){
//   this.anuncioService.finalizarAnuncio(idAnuncio).subscribe({
          
//     next:resp => {
//       this.showSuccessFinalizarAnuncio()
//       this.misAnuncios();
//       this.misAnunciosTerminados();
      
//    },
//    error: error =>{
//     this.showErrorFinalizarAnuncio();
//    } 
//  })
// }

/**
 * Este metodo se llamará cuando se pulse el boton de finalizar anuncio, se llamará al servicio de anuncio y segun la respuesta se 
 * mostrará el mensaje correspondiente
 * @param idAnuncio 
 */
 finalizarAnuncio(idAnuncio: number, emailSolicitante: string, textoComentario: string, puntuacionEstrellas: number){
  this.anuncioService.finalizarAnuncio(idAnuncio, emailSolicitante, textoComentario, puntuacionEstrellas).subscribe({
          
    next:resp => {
      this.showSuccessFinalizarAnuncio()
      this.misAnuncios();
      this.misAnunciosTerminados();
      this.closeDialogoComentario();
      
   },
   error: error =>{
    this.showErrorFinalizarAnuncio();
   } 
 })
}

/**
     * Metodo para subir el forumario
     */
 submitComentario(idAnuncio: number, emailSolicitante: string) {
  this.formComentario.markAllAsTouched();
  if(this.formComentario.valid){
    this.finalizarAnuncio(idAnuncio, emailSolicitante, this.formComentario.get("textoComentario")?.value, this.formComentario.get("puntuacionEstrellas")?.value);

  }
  else{
    Swal.fire({
      title: 'El registro no es válido',
      text: 'Completa los campos adecuadamente',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
 


}

solicitanteAddAnuncio(idAnuncio: number, emailSolicitante: string){
 
  this.anuncioService.solicitanteAddAnuncio(idAnuncio, emailSolicitante).subscribe({
          
    next:resp => {
      this.closeBasicDialog2()
   },
   error: error =>{
    this.showErrorFinalizarAnuncio();
   } 
 })
}
// finalizarAnuncio(idAnuncio: number, emailSolicitante:string){
//   this.anuncioService.finalizarAnuncio(idAnuncio,  emailSolicitante).subscribe({
          
//     next:resp => {
//       this.showSuccessFinalizarAnuncio()
//       this.misAnuncios();
//       this.misAnunciosTerminados();
      
//    },
//    error: error =>{
//     this.showErrorFinalizarAnuncio();
//    } 
//  })
// }

/**
 * Método para cargar la lista de solicitantes de un anuncio
 * @param idAnuncio 
 */
cargarListaSolicitantes(idAnuncio: number){
  this.anuncioService.cargarListaSolicitantes(idAnuncio).subscribe({
          
    next:resp => {
      console.log(resp)
      this.listaSolicitantes = resp;
      
   },
   error: error =>{
    this.showErrorFinalizarAnuncio();
   } 
 })
}

// asignarAnuncioSolicitante(idSolicitante: string, idAnuncio: number){
// this.anuncioService.asignarAnuncioSolicitante(idSolicitante, idAnuncio)
// }

showBasicDialog2(idAnuncio: number) {
  this.cargarListaSolicitantes(idAnuncio);
  this.displayBasic2 = true;
}

closeBasicDialog2() {
  this.displayBasic2 = false;
}

showDialogoComentario(anuncio: Anuncio, solicitante: Usuario) {
  this.anuncioComentar = anuncio;
  this.solicitante = solicitante;
  this.displayBasic2 = false;
  this.dialogoComentario = true;
}

closeDialogoComentario() {
  this.dialogoComentario = false;
}


/**
 * Metodo para elegir el solicitante que ha realizado el anuncio
 */
// elegirSolicitante(idAnuncio: Anuncio) {
//   this.confirmationService.confirm({
//       message: 'Are you sure that you want to perform this action?',
//       accept: () => {
//           //Actual logic to perform a confirmation
//       }
//   });
// }

//MENSAJES

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible borrar un anuncio
 */
 showSuccess() {
  this.messageService.add({severity:'success', summary: 'Eliminado', detail: 'El anuncio ha sido eliminado'});
}

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible terminar un anuncio
 */
 showSuccessFinalizarAnuncio() {
  this.messageService.add({severity:'success', summary: 'Guardado', detail: 'Comentario enviado correctamente'});
}

/**
 * Este método muestra el mensaje rojo con el texto indicado si no ha sido posible borrar un anuncio
 */
showError() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido eliminar el anuncio'});
}

/**
 * Este método muestra el mensaje rojo con el texto indicado si no ha sido posible terminar un anuncio
 */
 showErrorFinalizarAnuncio() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido enviar el comentario'});
}




}
