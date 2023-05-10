import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ENDPOINT_ = "http://localhost:3001/"; //  PC
const ENDPOINT = "http://91.126.201.110:3001/"; //  Red local
const CREAR = "crear";
const LISTAR = "listar";
const BUSCAR = "buscar";
const MODIFICAR = "modificar";
const BORRAR = "borrar";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private headers = new HttpHeaders({"Content-Type": "application/json"});

  constructor(private http: HttpClient) { }

  create(usuario: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(ENDPOINT + CREAR, usuario, {headers: this.headers});
  }

  listar() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(ENDPOINT + LISTAR).pipe(
      map(response => response as Usuario[]));
  }

  delete(id: string){
    return this.http.delete<number>(ENDPOINT + BORRAR + "/" + `${id}`);
  }

}
