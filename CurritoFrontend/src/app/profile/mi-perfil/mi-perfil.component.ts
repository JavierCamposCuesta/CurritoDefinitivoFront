import { Component, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorRegistroService } from 'src/app/services/validatorRegistro.service';
import { LoginRespuesta, Usuario } from 'src/app/interfaces/interface';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Byte } from '@angular/compiler/src/util';
import { MessageService } from 'primeng/api';
// Importo el archivo JSON 
import listaProvincias from 'src/assets/json/provincias.json';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
})
export class MiPerfilComponent implements OnInit {
  miFormularioDatosPerfil: FormGroup = this.fb.group({
    apellidos: ['',[Validators.required,Validators.pattern(this.ValidatorRegistroService.apellidosPattern),],],
    ubicacion: ['', [Validators.required]],
    nombre: ['',[Validators.required,Validators.pattern(this.ValidatorRegistroService.nombrePattern),],],
    telefono: ['',[ Validators.required,Validators.pattern(this.ValidatorRegistroService.telefonoPattern),],],
  });
  miFormularioDatosPass: FormGroup = this.fb.group(
    {
      passwordOld: ['', []],
      ubicacion: ['', [Validators.required]],
      passwordNew: ['', [Validators.required, Validators.minLength(6)]],
      passwordNew2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.ValidatorRegistroService.camposIguales(
          'passwordNew',
          'passwordNew2'
        ),
        // , this.validatorService.validarEmail('email')
      ],
    }
  );

  solucion: string = '';
  // private baseUrl: string = environment.baseUrl;

  constructor(
    private anuncioService: AnuncioService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private ValidatorRegistroService: ValidatorRegistroService,
    private registerService: RegisterService,
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService,
    private messageService: MessageService
    ) { }
    
  usuarioRegistrado: Usuario = {};
  selectedFiles?: FileList;
  currentFile?: any = 'NotSelected';
  previsualizarImagen: any = '';
  listaProvincias: any = listaProvincias;
  
  ngOnInit(): void {
    this.conseguirUsuarioRegistrado();
    window.scrollTo(0, 0);

    this.miFormularioDatosPerfil.markAllAsTouched();

    //Ordenamos la lista de provincias
      this.listaProvincias = this.listaProvincias.sort(this.compareProvincias);
  }

  /**
     * Metodo para ordenar json de provincias
     * @param a primer parametro
     * @param b segundo parametro
     * @returns lista ordenada alfabeticamente
     */
   compareProvincias(a: any, b:any ):number {
    //localeCompare lo utilizamos para ordenar cadenas teniendo en cuenta los acentos
    return a.nm.localeCompare(b.nm);
    
  }

  /**
   * Este método sirve para obtener los archivos seleccionados
   * @param event
   */
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.previsualizarImagen = event.target?.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.previsualizarImagen = '';
    }
  }

  /**
   * Método para cerrar sesión
   */
  cerrarSesion() {
    localStorage.removeItem('jwt');
    this.router.navigate(['home']);
  }

  /**
   * Método que llama a getImage del servicio y transforma un array de bytes en una url correspondiente a una imagen
   * @param file
   * @returns
   */
  getImage(file: Byte[]) {
    return this.usuarioService.getImage(file);
  }

  /**
   * Metodo para conseguir el usuario que está logueado
   */

  conseguirUsuarioRegistrado() {
    this.loginService.validarToken().subscribe({
      next: (resp) => {
        this.usuarioRegistrado = resp;
        this.miFormularioDatosPerfil.reset({
          nombre: this.usuarioRegistrado.nombre,
          apellidos: this.usuarioRegistrado.apellidos,
          telefono: this.usuarioRegistrado.telefono,
          ubicacion: this.usuarioRegistrado.ubicacion,
        });
        this.previsualizarImagen = this.getImage(this.usuarioRegistrado.fotoPerfil!);
      },
      error: (error) => { },
    });
  }

  /**
   * Metodo para mostrar mensajes en los campos de editar perfil
   * @param campo
   * @returns
   */
  campoNoValido(campo: string) {
    // this.findInvalidControlsRecursive(this.miFormulario);
    return (
      this.miFormularioDatosPerfil.get(campo)?.invalid &&
      this.miFormularioDatosPerfil.get(campo)?.touched
    );
  }

  /**
   *Metodo para mostrar mensaje en los campos de password
   * @param campo
   * @returns
   */
  campoNoValidoPass(campo: string) {
    // this.findInvalidControlsRecursive(this.miFormulario);
    return (
      this.miFormularioDatosPass.get(campo)?.invalid &&
      this.miFormularioDatosPass.get(campo)?.touched
    );
  }

  /**
   * Metodo para ver donde falla el formulario
   */
  // public findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
  //   var invalidControls:string[] = [];
  //   let recursiveFunc = (form:FormGroup|FormArray) => {
  //     Object.keys(form.controls).forEach(field => {
  //       const control = form.get(field);
  //       if (control?.invalid) invalidControls.push(field);
  //       if (control instanceof FormGroup) {
  //         recursiveFunc(control);
  //       } else if (control instanceof FormArray) {
  //         recursiveFunc(control);
  //       }
  //     });
  //   }
  //   recursiveFunc(formToInvestigate);
  //   console.log(invalidControls)
  //   console.log(this.miFormulario.valid + "gfgdfgdgdfgfdgfdgdfg")
  //   return invalidControls;
  // }

  submitFormulario() {
    this.updateProfile();

    this.miFormularioDatosPerfil.markAllAsTouched();
  }

  /**
   * Metodo para subir el formulario de actualizar contraseña
   */
  submitFormularioPass() {
    const passEdit: any = {
      passwordOld: this.miFormularioDatosPass.get('passwordOld')?.value,
      passwordNew: this.miFormularioDatosPass.get('passwordNew')?.value,
      passwordNew2: this.miFormularioDatosPass.get('passwordNew2')?.value,
    };

    this.usuarioService.updatePass(passEdit).subscribe({
      next: (resp) => {
        this.conseguirUsuarioRegistrado();
        this.mensajePassEditadoCorrectamente();
      },
      error: (err: any) => {
        this.errorPassEditado();
        this.currentFile = undefined;
      },
    });
  }

  comprobarRespuestaLogin() {
    if (this.solucion == 'true') {
    } else if (this.solucion == 'incorrect') {
    } else {
    }
  }

  updateProfile() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
      }
    }

    let respuesta: any = {};
    let solucion: string;
    const userEditar: any = {
      nombre: this.miFormularioDatosPerfil.get('nombre')?.value,
      apellidos: this.miFormularioDatosPerfil.get('apellidos')?.value,
      telefono: this.miFormularioDatosPerfil.get('telefono')?.value,
      ubicacion: this.miFormularioDatosPerfil.get('ubicacion')?.value,
    };

    this.usuarioService
      .updateProfile(userEditar, this.currentFile)
      .subscribe({
        next: (resp) => {
          respuesta = resp;
          this.miFormularioDatosPerfil.reset();
          this.mensajePerfilEditadoCorrectamente();
          
          this.conseguirUsuarioRegistrado();
          location.reload();

        },
        error: (err: any) => {
          solucion = 'error';
         this.errorPerfilEditado();
          this.currentFile = undefined;
        },
      });
    // }
    this.selectedFiles = undefined;
    // }
  }

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible editar un perfil
 */
 mensajePerfilEditadoCorrectamente() {
  this.messageService.add({severity:'success', summary: 'Actualizado', detail: 'Perfil actualizado correctamente'});
}

/**
 * Este método muestra el mensaje rojo con el texto indicado si no ha sido posible editar un perfil
 */
 errorPerfilEditado() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido actualizar el perfil'});
}

/**
 * Este método muestra el mensaje verde con el texto indicado si ha sido posible actualizar una contraseña
 */
 mensajePassEditadoCorrectamente() {
  this.messageService.add({severity:'success', summary: 'Actualizada', detail: 'Contraseña actualizada correctamente'});
}

/**
 * Este método muestra el mensaje rojo con el texto indicado si no ha sido posible actualizar una contraseña
 */
 errorPassEditado() {
  this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido actualizar la contraseña'});
}



}
