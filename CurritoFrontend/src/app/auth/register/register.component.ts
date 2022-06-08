import { Component, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ValidatorRegistroService } from 'src/app/services/validatorRegistro.service';
import { LoginRespuesta } from 'src/app/interfaces/interface';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
  email: ['', [Validators.required, Validators.pattern(this.ValidatorRegistroService.emailPattern)],[this.ValidatorRegistroService]],
  password: ['', [ Validators.required, Validators.minLength(6)]  ],
  password2: ['', [ Validators.required]  ],
  apellidos: ['', [ Validators.required, Validators.pattern(this.ValidatorRegistroService.apellidosPattern)]  ],
  direccion: ['', [ Validators.required]  ],
  nombre: ['', [ Validators.required, Validators.pattern(this.ValidatorRegistroService.nombrePattern)]  ],
  nacimiento: ['', [ Validators.required]  ],
  telefono: ['', [ Validators.required, Validators.pattern(this.ValidatorRegistroService.telefonoPattern)]]
},
{
  validators: [this.ValidatorRegistroService.camposIguales('password', 'password2')
  
],
}
);

formCodigo: FormGroup = this.fb.group({
  codigoVerificacionIntroducido: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(4)]  ]
})

solucion: string = "";
codVerificacionIntroducido: number= 1;
codVerificacionCorrecto: number= 2;
dialogoVerificacion: boolean = false;



/**
 * metodo que construye los distintos mensajes de error segun el error que sea
 */
get emailErrorMsg(): string {
  
  const errors = this.miFormulario.get('email')?.errors!;
  if ( errors['required'] ) {
    return 'Email es obligatorio';
  } else if ( errors['pattern'] ) {
    return 'El valor ingresado no tiene formato de correo';
  }
  else if ( errors['emailTomado'] ) {
    return 'El email ya está en uso';
  }
  
  return '';
}





constructor( private fb: FormBuilder,
  private ValidatorRegistroService: ValidatorRegistroService,
  private registerService: RegisterService,
  private http: HttpClient,
  private router:Router
 ) { }
  
  
  ngOnInit(): void {
    
    this.miFormulario.reset({
      email: '',
      password: '',
      password2: '',
      apellidos: '',
      direccion: '',
      nacimietno: ''
    })
  }
  

  /**
   * Metodo que muestra el mensaje de error corespondiente
   * @param campo 
   * @returns Mensaje correspondiente
   */
  campoNoValido( campo: string ) {
    
    // this.findInvalidControlsRecursive(this.miFormulario);
    return this.miFormulario.get(campo)?.invalid
    && this.miFormulario.get(campo)?.touched;
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

  
  
  
    
    
    
    /**
     * Metodo para subir el forumario
     */
    submitFormulario() {
      this.miFormulario.markAllAsTouched();
      if(this.miFormulario.valid){
        this.register()

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

    crearCodigoVerificacion(){
      this.registerService.verificarUsuario(this.miFormulario.get("email")?.value).subscribe({
        
        next:resp => {
          console.log(resp);
          this.codVerificacionCorrecto = resp;
       },
       error(error){
  
         Swal.fire({
           title: 'Error al enviar el código de verificación',
           text: 'Vuelve a intentarlo',
           icon: 'error',
           confirmButtonText: 'Ok',
           customClass:{
            container: "swalFire",
           }

         })
       }
     })
    }

    /**
     * Metodo que comprueba si el codigo que se introduce es igual al código de verificación generado 
     * En caso de ser correcto se lanza el método para crear el usuario, en caso contrario se muestra un error
     */
    verificarUsuario(){
      console.log(this.formCodigo.get("codigoVerificacionIntroducido")?.value)
      if(this.formCodigo.get("codigoVerificacionIntroducido")?.value == this.codVerificacionCorrecto){
        this.submitFormulario();
      }
      else{
        Swal.fire({
          title: 'Codigo de verificacion incorrecto',
          text: 'Vuelve a intentarlo',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }

    abrirDialogoVerificacion() {
      this.dialogoVerificacion = true;
      this.crearCodigoVerificacion();
    }

    cerrarDialogoVerificacion() {
      this.dialogoVerificacion = true;
    }
    
    /**
     * Este metodo recibira un usuario del formulario y llamara 
     * a registerService para realizar una peticion post de añadir
     * el usuario
     */
    register(){
      let respuesta: LoginRespuesta = {};
      let solucion: string;
      const user = {
        "email": this.miFormulario.get("email")?.value,
        "password": this.miFormulario.get("password")?.value,
        "nombre": this.miFormulario.get("nombre")?.value,
        "apellidos": this.miFormulario.get("apellidos")?.value,
        "telefono": this.miFormulario.get("telefono")?.value,
        "ubicacion": this.miFormulario.get("direccion")?.value,
        "fechaNacimiento": this.miFormulario.get("nacimiento")?.value,
        

    }
    this.registerService.register(user).subscribe({
        
      next:resp => {
        respuesta = resp;
       if(respuesta.jwt_token != null){
         localStorage.setItem('jwt', respuesta.jwt_token);
         // De esta forma conseguimos que se recarge la página al entrar al home y se lancen las peticiones necesarias
         location.replace("home") // replace
         solucion = "true";
       }
     },
     error(error){
       solucion = "error";
       localStorage.removeItem('jwt');
       Swal.fire({
         title: 'Error al registrar usuario',
         text: 'Vuelve a intentarlo',
         icon: 'error',
         confirmButtonText: 'Ok'
       })
     }

     
     
     
   })
    }





}


