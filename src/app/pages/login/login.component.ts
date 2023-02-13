import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { window } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router:Router){ }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.password.trim() == ''){
      this.snack.open('Los campos no pueden estar vacios!!', 'Aceptar',{
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any)=>{
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == "ADMIN"){
            //DASHBOARD ADMIN
            //window.location.href = '/admin';
            this.router.navigate(['admin']);

          }
          else if(this.loginService.getUserRole() == "NORMAL"){
            //DASHBOARD ADMIN
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard']);
          }
          else{
            this.loginService.logout();
          }
        })
      }, (error) => {
        console.log(error);
        this.snack.open('Datos invalidos. vuelva a intentar!', 'Aceptar', {
          duration:3000
        })
      }
    )
  }

}
