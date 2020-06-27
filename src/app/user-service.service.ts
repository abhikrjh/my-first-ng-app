import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  endPointUserList :string = 'userList';
  endPointAddUser : string = 'addUser';
  endPointdeleteUser : string = 'deleteUser';

  getUrl(value : string){
     return "http://localhost:8080/"+value;
  }
   

}
