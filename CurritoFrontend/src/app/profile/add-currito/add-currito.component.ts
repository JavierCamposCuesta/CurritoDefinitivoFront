import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Anuncio, Categoria, Data, LoginRespuesta } from 'src/app/interfaces/interface';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { RegisterService } from 'src/app/services/register.service';
import { ValidatorRegistroService } from 'src/app/services/validatorRegistro.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
// Importo el archivo JSON 
import listaProvincias from 'src/assets/json/provincias.json';

@Component({
  selector: 'app-add-currito',
  templateUrl: './add-currito.component.html',
  styleUrls: ['./add-currito.component.css']
})


export class AddCurritoComponent implements OnInit {

  /**
   * Comprobamos si es un anuncio para editar o no
   */
  @Input() edit=false;

  /**
   * Con esto conseguimos el anuncio que queremos editar, el cual lleva consigo el id del anuncio
   */
  @Input() anuncioEditar:Anuncio= {};
  titulo:string='';
  botonRegistro:string = '';
  categoriaDefecto:string="Todas las categorias"
  tipoPrecioDefecto:string="Por horas";
  selectedFiles?: FileList;
  currentFile?: any= "notFound";
  message = '';
  fileInfos?: Observable<any>;
  mostrar: boolean = false;
  listaProvincias: any = listaProvincias;
  // imagenPorDefecto: File = require('../../../assets/img/default.png');
  domicilioPorDefecto:string="Almería"
  previsualizarImagen:any=""
  /**
   * Lo emitimos para que se recargue el componente de mostrar los anuncios solicitados, una vez que hemos actualizado el anuncio
   */
  @Output()
  recargarListado = new EventEmitter();

  

  miFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required]],
    categoria: ['', [ Validators.required]],
    precio: ['', [ Validators.required  ]],
    tipoPrecio: ['', [ Validators.required  ]  ],
    descripcion: [''  ],
    // file: ['', [ Validators.required, Validators.pattern(this.ValidatorRegistroService.nombrePattern)]  ],
    ubicacion: ['' ],
    id:[''],
    imagen:['']
  },
  {
  
  }
  );
  
  solucion: string = "";
  private baseUrl: string = environment.baseUrl; 
  
  constructor( private fb: FormBuilder,
    private ValidatorRegistroService: ValidatorRegistroService,
    private registerService: RegisterService,
    private http: HttpClient,
    private router:Router,
    private categoriaService:CategoriaService,
    private anuncioService: AnuncioService,
    private messageService: MessageService, ) { }
    
    
    ngOnInit(): void {
      window.scrollTo(0,0)
      this.miFormulario.reset({
        titulo: '',
        categoria: '',
        precio: '',
        tipoPrecio: '',
        descripcion: '',
        ubicacion: '',
        id:'',
        imagen:''
      })

      this.titulo = "Nuevo Currito";
      this.botonRegistro ="Subir anuncio";

      //Ordenamos la lista de provincias
      this.listaProvincias = this.listaProvincias.sort(this.compareProvincias);



      this.mostrarCategorias();
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
     * Si accedemos a este componente a través de editar anuncio, rellenaremos los campos con el anuncio que nos hemos traido
     */
    ngOnChanges(): void{
      this.miFormulario.reset({
        titulo: this.anuncioEditar.titulo,
        categoria: this.anuncioEditar.categoria,
        precio: this.anuncioEditar.precio,
        tipoPrecio: this.anuncioEditar.tipoPrecio,
        descripcion: this.anuncioEditar.descripcion,
        ubicacion: this.anuncioEditar.ubicacion,
        id: this.anuncioEditar.id
        
      })
      this.previsualizarImagen= this.getImage(this.anuncioEditar.file!);
      this.titulo= "Editar Currito";
      this.botonRegistro = "Actualizar anuncio"
    }
    
    campoNoValido( campo: string ) {
     
      // this.findInvalidControlsRecursive(this.miFormulario);
      return this.miFormulario.get(campo)?.invalid
      && this.miFormulario.get(campo)?.touched;
    }
  
      /**
       * Este metodo llamará al metodo añadirAnuncio y marcará todos los campos del formulario como marcados
       */
      submitFormulario() {
      
        if(this.botonRegistro == 'Actualizar anuncio'){
          this.editarAnuncio();
        }
        else{
          this.addCurrito()

        }
       
      
        this.miFormulario.markAllAsTouched();
      
      }
      
      /**
         * Este método sirve para obtener los archivos seleccionados
         * @param event
         */
        selectFile(event: any): void {
          this.selectedFiles = event.target.files;
          if(this.selectedFiles){
            const reader = new FileReader();
            reader.onload = (event)=>{
              this.previsualizarImagen = event.target?.result;
            };
            reader.readAsDataURL(event.target.files[0]);
          }
          else{
            this.previsualizarImagen= "";
          }
        }

        
      
      /**
       * Este metodo recibira un usuario del formulario y llamara 
       * a registerService para realizar una peticion post de añadir
       * el usuario
       */
      addCurrito(){

        if (this.selectedFiles) {

          const file: File | null = this.selectedFiles.item(0);
          if (file) {
            this.currentFile = file;
          }
        }

        let respuesta: LoginRespuesta = {};
        let solucion: string;
        const anuncio = {
          "titulo": this.miFormulario.get("titulo")?.value,
          "categoria": this.miFormulario.get("categoria")?.value,
          "precio": this.miFormulario.get("precio")?.value,
          "tipoPrecio": this.miFormulario.get("tipoPrecio")?.value,
          "descripcion": this.miFormulario.get("descripcion")?.value,
          "ubicacion": this.miFormulario.get("ubicacion")?.value
      }

      this.anuncioService.addAnuncio(anuncio, this.currentFile).subscribe({
          
        next:resp => {
          respuesta = resp;
          this.anuncioEditadoCorrectamente();
          this.miFormulario.reset();
          this.previsualizarImagen=""
        //  if(respuesta.jwt_token != null){
        //    localStorage.setItem('jwt', respuesta.jwt_token);
        //    this.router.navigate(['home']);
        //    solucion = "true";
        //  }
       },
       error: (err: any) => {
         solucion = "error";
        //  localStorage.removeItem('jwt');
         Swal.fire({
           title: 'Error al crear anuncio',
           text: 'Vuelve a intentarlo',
           icon: 'error',
           confirmButtonText: 'Ok'
         })
         this.currentFile = undefined;
       },
     })
    // }
    this.selectedFiles = undefined;
    // }
      }

      
      
      /**
       * Metodo para editar un anuncio, recibimos un anuncio modificado y hacemos la llamada mandando el anuncio que queremos modificar y el 
       * nuevo anuncio con los cambios modificados
       */
      editarAnuncio(){
        if (this.selectedFiles) {

          const file: File | null = this.selectedFiles.item(0);
          if (file) {
        this.currentFile = file;
          }
        }
        let respuesta: LoginRespuesta = {};
        let solucion: string;
        const anuncio = {
          "titulo": this.miFormulario.get("titulo")?.value,
          "categoria": this.miFormulario.get("categoria")?.value,
          "precio": this.miFormulario.get("precio")?.value,
          "tipoPrecio": this.miFormulario.get("tipoPrecio")?.value,
          "descripcion": this.miFormulario.get("descripcion")?.value,
          "ubicacion": this.miFormulario.get("ubicacion")?.value,
          "id":this.miFormulario.get("id")?.value
          
          
          
          
        }
        this.anuncioService.editAnuncio(anuncio, this.currentFile).subscribe({
          
          next:resp => {
            respuesta = resp;
         
            //emitimos el evento para que se recargue el componente
            this.recargarListado.emit("");
            // window.location.reload();
            
          },
          error: (err: any) => {
            solucion = "error";
            //  localStorage.removeItem('jwt');
            Swal.fire({
              title: 'Error al editar anuncio',
              text: 'Vuelve a intentarlo',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            this.currentFile = undefined;
          }
          
          
          
          
        })
      // }
      this.selectedFiles = undefined;
      // }
        }
      
      
      listaCategorias:Data={
        data:[],
        page:0,
        limit:0
      };
      /**
       * Metodo para mostrar la lista de categorias, la cual la recibe del servicio categoriaService
       */
      mostrarCategorias(){
        this.categoriaService.mostrarCategorias()
        .subscribe( resp => {
          this.listaCategorias=resp;
          
        })
      }
      
  
      //Mensajes
      anuncioEditadoCorrectamente() {
        this.messageService.add({severity:'success', summary: 'Añadido', detail: 'El anuncio ha sido añadido correctamente'});
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
    