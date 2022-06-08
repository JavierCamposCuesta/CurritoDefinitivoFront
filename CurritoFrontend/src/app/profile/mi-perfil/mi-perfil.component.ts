import { Component, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ValidatorRegistroService } from 'src/app/services/validatorRegistro.service';
import { LoginRespuesta } from 'src/app/interfaces/interface';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  
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
    // , this.validatorService.validarEmail('email')
  ],
  }
  );
  
  solucion: string = "";
  private baseUrl: string = environment.baseUrl; 
  
  
  
  
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
    private router:Router ) { }
    
    
    ngOnInit(): void {
      window.scrollTo(0,0)
      this.miFormulario.reset({
        email: '',
        password: '',
        password2: '',
        apellidos: '',
        direccion: '',
        nacimietno: ''
      })
    }
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
    
    
      
      
      
       
      submitFormulario() {
      
        this.register()
       
      
        this.miFormulario.markAllAsTouched();
      
      }
  
      comprobarRespuestaLogin(){
        if(this.solucion == "true"){
  
        }
        else if(this.solucion == "incorrect"){
  
        }
        else{
  
        }
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
           this.router.navigate(['home']);
           solucion = "true";
         }
       },
       error(error){
         solucion = "error";
         localStorage.removeItem('jwt');
         Swal.fire({
           title: 'Error al inciar sesión',
           text: 'Vuelve a intentarlo',
           icon: 'error',
           confirmButtonText: 'Ok'
         })
       }
  
       
       
       
     })
      }
  

}
