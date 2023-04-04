import Swal from 'sweetalert2';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  examenId:any;
  preguntas:any;
  puntosConseguidos=0;
  respuestasCorrectas=0;
  intentos=0;
  esEnviado=false;
  timer:any;

  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService:PreguntaService
  ){}

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();

    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamenDeLaPrueba(this.examenId).subscribe(
      (data:any) => {
        console.log(data);
        this.preguntas=data;

        this.timer = this.preguntas.length*2*60;

        this.preguntas.forEach((p:any) => {
          p['respuestaDada']='';
        });
        console.log(this.preguntas);
        this.iniciarTemporizador();
      },
      (error:any) =>{
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas de la prueba', 'error');
      }
    )
  }

  iniciarTemporizador(){
    let tiempo = window.setInterval(() => {
      if(this.timer<=0){
        this.evaluarExamen();
        clearInterval(tiempo);
      }else{
        this.timer--;
      }
    },1000)
  }

  prevenirElBotonDeRetroceso(){
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,null!,location.href);
    })
  }

  enviarCuestionario(){
    Swal.fire({
      title:'¿Quieres enviar el examen?',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed){
        this.esEnviado=true;
        this.preguntas.forEach((p:any) => {
          if(p.respuestaDada == p.respuesta){
            this.respuestasCorrectas++;
            let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
            this.puntosConseguidos += puntos;
          }
          if(p.respuestaDada.trim() != ''){
            this.intentos++;
          }
        })
      }
    })
  }

  evaluarExamen(){
    this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      (data:any)=>{
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
        this.esEnviado = true;
      },
      (error)=>{
        console.log(error);
      }
    )
    /*this.esEnviado=true;
        this.preguntas.forEach((p:any) => {
          if(p.respuestaDada == p.respuesta){
            this.respuestasCorrectas++;
            let puntos = this.preguntas[0].examen.puntosMaximos/this.preguntas.length;
            this.puntosConseguidos += puntos;
          }
          if(p.respuestaDada.trim() != ''){
            this.intentos++;
          }
        })*/
  }

  obtenerHoraFormateada(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} : min : ${ss} seg`;
  }

  imprimirPagina(){
    window.print();
  }
}
