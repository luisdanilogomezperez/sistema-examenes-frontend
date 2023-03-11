import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  categorias:any;

  constructor(
    private categoriaService:CategoriaService,
    private snack:MatSnackBar,
    public login:LoginService
    ){}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        this.snack.open('Error al cargar las categorías', '', {
          duration:3000
        });
        console.log(error);
      }
    )
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
