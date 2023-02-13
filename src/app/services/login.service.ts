import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseRUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //generar token
  public generateToken(loginData:any){
    return this.http.post(`${baseRUrl}/generate-token`, loginData)
  }

  public getCurrentUser(){
    return this.http.get(`${baseRUrl}/actual-usuario`);
  }

  //iniciar sesión y se establece el token en el localStorage

  public loginUser(token:any){
    localStorage.setItem('token', token);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerrar sesión y eliminar token

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtener token

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }

  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}



