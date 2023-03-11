import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseRUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient) { }

  public listarCuestionarios(){
    return this.http.get(`${baseRUrl}/examen/`)
  }

  public agregarCuestionario(examen:any){
    return this.http.post(`${baseRUrl}/examen/`,examen)
  }

  public actualizarCuestionario(examen:any){
    return this.http.put(`${baseRUrl}/examen/`,examen)
  }

  public eliminarExamen(examenId:any){
    return this.http.delete(`${baseRUrl}/examen/${examenId}`);
  }

  public obtenerExamen(examenId:any){
    return this.http.get(`${baseRUrl}/examen/${examenId}`);
  }
}
