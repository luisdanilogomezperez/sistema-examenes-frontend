import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit{


  constructor(private route:ActivatedRoute,
    private categoriaService:CategoriaService,
    private exmaenService:ExamenService,
    private router:Router){
  }


  examen:any;
  examenId = 0;
  categorias:any;

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.exmaenService.obtenerExamen(this.examenId).subscribe(
      (data) => {
        this.examen = data;
        console.log(this.examen);
      }
    );

    this.categoriaService.listarCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.log('Error al cargar las categorias');
      }
    )
  }

  actualizarCuestionario(){
    this.exmaenService.actualizarCuestionario(this.examen).subscribe(
      (data) => {
        Swal.fire('Examen actualizado', 'Examen actualizado correctamente', 'success').then(
          (e) => {
            this.router.navigate(['/admin/examenes']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar el cuestionario', 'error');
        console.log(error);
      }
      );
    }


}
