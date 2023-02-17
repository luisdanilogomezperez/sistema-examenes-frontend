import Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit{


  categoria = {
    titulo:'',
    descripcion:''
  }

  constructor(private categoriaService:CategoriaService, private snack:MatSnackBar,private router:Router){

  }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.categoria.titulo.trim()=='' || this.categoria.titulo.trim()==null){
      this.snack.open("El titulo es requerido!!", '', {
        duration: 3000
      })
      return;
    }

    this.categoriaService.agregarCategoria(this.categoria).subscribe(
      (data:any) => {
        this.categoria.titulo ='';
        this.categoria.descripcion ='';
        Swal.fire('Categoria agregada', 'La categoria ha sido agregada con éxito','success');
        this.router.navigate(['/admin/categorias']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al agregar la categoria', 'error')
      }

    )

  }

}
