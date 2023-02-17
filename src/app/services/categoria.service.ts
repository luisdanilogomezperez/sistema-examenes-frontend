import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseRUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  public listarCategorias(){
    return this.http.get(`${baseRUrl}/categoria/`)
  }

  public agregarCategoria(categoria:any){
    return this.http.post(`${baseRUrl}/categoria/`,categoria)
  }
}
