import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Anuncio, Comentario, Usuario } from 'src/app/interfaces/interface';
import { NotificationService } from 'src/app/services/notification.service';
import { OpinionsService } from 'src/app/services/opinions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService, private fb: FormBuilder, private opinionService: OpinionsService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.conseguirComentariosPendientes();
  }

  listaComentariosPendientes: Comentario[]= [];
  dialogoComentario: boolean = false;

  formComentario: FormGroup = this.fb.group({
    textoComentario: ['', [Validators.required]],
    puntuacionEstrellas: [3, [ Validators.required]  ]
    
  })

  conseguirComentariosPendientes(){
    this.notificationService.conseguirComentariosPendientes().subscribe({
        
      next:resp => {
        this.listaComentariosPendientes = resp;
     },
     error: error =>{
     }
   })
  }

  showDialogoComentario() {
    
    this.dialogoComentario = true;
  }
  
  closeDialogoComentario() {
    this.dialogoComentario = false;
  }

  /**
     * Metodo para subir el forumario
     */
 submitComentario(idComentario: number) {
  this.formComentario.markAllAsTouched();
  if(this.formComentario.valid){
    this.opinionService.subirComentario(idComentario, this.formComentario.get("textoComentario")?.value, this.formComentario.get("puntuacionEstrellas")?.value).subscribe({
        
      next:resp => {
        this.showSuccessFinalizarAnuncio();
        this.closeDialogoComentario();
     },
     error: error =>{
     }
   })
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

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible terminar un anuncio
 */
 showSuccessFinalizarAnuncio() {
  this.messageService.add({severity:'success', summary: 'Guardado', detail: 'Comentario enviado correctamente'});
}

}
