import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";

import { LoginService } from "./login.service";
 
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor( private router: Router, private loginService: LoginService, private http:HttpClient) { }
 
  /**
   * Método que llama a validarToken del servicio y dependiendo del resultado permitirá o no 
   * la entrada a la siguiente página
   * @param route 
   * @param state 
   * @returns 
   */
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree| any {

    return this.loginService.validarToken()
    .pipe(
        map( resp => {

          return true
        }),
        catchError( err => {
           
            this.router.navigateByUrl('/login');
            return of(false)
        })
      )
  }

  /**
   * Método que llama a validarToken del servicio y dependiendo del resultado permitirá o no 
   * la entrada a la siguiente página
   * @param route 
   * @param state 
   * @returns 
   */
canActivateChild(route: ActivatedRouteSnapshot, 

  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

return this.canActivate(route, state);
}

/**
 * Método que llamará a validarToken del servicio y dependiendo del resultadó permitirá la carga del modulo o no
 * @param route 
 * @returns 
 */
canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
  return this.loginService.validarToken()
    .pipe(
        map( resp => {

          return true
        }),
        catchError( err => {
           
            this.router.navigateByUrl('/login');
            return of(false)
        })
      )
}
}