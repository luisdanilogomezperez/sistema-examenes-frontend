import Swal from 'sweetalert2';
import { ExamenService } from './../../../services/examen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit {

  examenes : any = [];

  constructor(public examenService:ExamenService){

  }

  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe(
      (data) => {
        this.examenes = data;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Eror al cargal los examenes', 'error')
      }
    );

  }


  eliminarExamen(examenId:any){
    Swal.fire({
      title:'Eliminar examen',
      text:'¿Seguro que desea eliminar el examen?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        this.examenService.eliminarExamen(examenId).subscribe(
          (data) => {
            console.log(examenId);
            this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId);
            Swal.fire('Examen','El examen ha sido eliminado correctamente', 'success');
          },(error) => {
            Swal.fire('Error','Ha habido un error al intentar eliminar el examen', 'error');
          }
        )
      }
    })
  }

}
