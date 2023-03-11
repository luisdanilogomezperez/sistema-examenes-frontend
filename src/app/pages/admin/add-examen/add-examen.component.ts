import { ExamenService } from './../../../services/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {

  categorias:any = [];

  examenData = {
    titulo:'',
    descripcion:'',
    puntosMaximos:'',
    numeroDePreguntas:'',
    activo:true,
    categoria:{
      categoriaId:''
    }
  }

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    private exmaenService:ExamenService,
    private router:Router){
  }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data) => {
        this.categorias = data;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las categorias', 'error')
      }
    )
  }

  guardarCuestionario(){
    console.log(this.examenData);
    if (this.examenData.titulo.trim() == '' || this.examenData.titulo == null){
        this.snack.open('El titulo es requerido','',{
        duration: 3000
       });
       return ;
    }

    this.exmaenService.agregarCuestionario(this.examenData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Exmaen guardado','Examen registrado exitosamente', 'success')
        this.examenData = {
          titulo : '',
          descripcion : '',
          puntosMaximos : '',
          numeroDePreguntas : '',
          activo:true,
          categoria:{
            categoriaId:''
          }
        }
        this.router.navigate(['/admin/examenes']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al guardar el examen', 'error')
      }
    )
  }

}
