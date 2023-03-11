import { PreguntaService } from './../../../services/pregunta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css']
})
export class ActualizarPreguntaComponent implements OnInit {

  constructor(private route:ActivatedRoute, private preguntaService:PreguntaService, private router:Router){}

  titulo:any;
  pregunta:any;
  preguntaId:any;

  ngOnInit(): void {this.preguntaId = this.route.snapshot.params['preguntaId'];
  this.preguntaService.listarPreguntaPorID(this.preguntaId).subscribe(
    (data) => {
      this.pregunta = data;
      console.log(this.pregunta);
    }
  );
  }

  public actualizarPregunta(preguntaId:any){
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe(
      (data) => {
        Swal.fire('Pregunta actualizada', 'Pregunta actualizada correctamente', 'success').then(
          (e) => {
            this.router.navigate(['/admin/ver-preguntas/'+this.pregunta.examen.examenId+'/'+this.pregunta.examen.titulo]);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
