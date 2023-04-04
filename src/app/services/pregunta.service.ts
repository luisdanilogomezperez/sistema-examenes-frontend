import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseRUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http:HttpClient) { }

  public listarPreguntasDelExamen(examenId:any){
    return this.http.get(`${baseRUrl}/pregunta/examen/todos/${examenId}`);
  }

  public guardarPregunta(pregunta:any){
    return this.http.post(`${baseRUrl}/pregunta/`,pregunta);
  }

  public eliminarPregunta(preguntaId:any){
    return this.http.delete(`${baseRUrl}/pregunta/${preguntaId}`);
  }

  public actualizarPregunta(pregunta:any){
    return this.http.put(`${baseRUrl}/pregunta/`,pregunta);
  }

  public listarPreguntaPorID(preguntaId:any){
    return this.http.get(`${baseRUrl}/pregunta/${preguntaId}`);
  }

  public listarPreguntasDelExamenDeLaPrueba(examenId:any){
    return this.http.get(`${baseRUrl}/pregunta/examen/todos/${examenId}`);
  }
  public evaluarExamen(preguntas:any){
    return this.http.get(`${baseRUrl}/pregunta/evaluar-examen`,preguntas);
  }
}
