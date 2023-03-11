import { MatSnackBar } from '@angular/material/snack-bar';
import  Swal  from 'sweetalert2';
import { PreguntaService } from './../../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent implements OnInit {


  preguntas : any = [];
  examenId:any;
  titulo:any;

  constructor(private route:ActivatedRoute,
    private preguntaService:PreguntaService,
    private snack:MatSnackBar){}

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe(
      (data) => {
        console.log(data);
        this.preguntas = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  public eliminarPregunta(preguntaId:any){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.preguntaService.eliminarPregunta(preguntaId).subscribe(
          (data) => {
            this.preguntas = this.preguntas.filter((pregunta:any) => pregunta.preguntaId != preguntaId);
            this.snack.open('Pregunta eliminada','',{
              duration:3000
            })
          },
          (err) => {
            console.log(err);
            this.snack.open('Error al eliminar la pregunta','',{
              duration:3000
            })
          }
        )
      }
    })
  }

}
