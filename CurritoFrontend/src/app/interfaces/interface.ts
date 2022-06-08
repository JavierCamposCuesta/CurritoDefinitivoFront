import { Byte } from "@angular/compiler/src/util";

export interface Categoria {
    nombre:        string;
    listaAnuncios: any[];
    icono: string;
}

export interface Data {
    data:Categoria[],
    page:number,
    limit:number
    
}

export interface LoginRespuesta {
    jwt_token?: string;
    timestamp?: Date;
    status?:    number;
    error?:     string;
    trace?:     string;
    message?:   string;
    path?:      string;
}

export interface Usuario {
    email?: string;
    password?: string;
    nombre?: string;
    apellidos?: string;
    telefono?: string;
    fechaNacimiento?: string;
    ubicacion?: string;
}

// export interface Anuncio {
//     id?: number;
//     titulo?: string;
//     precio?: number;
//     descripcion?: string;
//     categoria?: string;
//     tipoPrecio?: string;
// }

export interface Anuncio {
    id?:           number;
    titulo?:       string;
    precio?:       number;
    descripcion?:  null | string;
    categoria?:    string;
    finalizado?:   boolean;
    fechaAnuncio?: Date;
    fechaFin?:     null | Date;
    tipoPrecio?:   string;
    autorAnuncio?: Usuario;
    ubicacion?: string;
    comentario?: any;
    file?: Byte[]
}

export interface Comentario {
    id?:           number;
    usuarioComentado?: Usuario;
    usuarioComentador?: Usuario;
    textoComentario?: string;
    fecha?: Date;
    anuncio?: Anuncio;
    puntuacionEstrellas?: number;
    realizado?: boolean;
    realizaste?: boolean;
}



