import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isUserLogedin: any;
  constructor() { 
    this.isUserLogedin = false;
  }

  setUserLogedin(){
    this.isUserLogedin = true;
  }
  getUserLogedin(){
    return this.isUserLogedin;
  }
}
