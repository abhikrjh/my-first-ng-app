import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  endPointUserList :string = 'userList';
  endPointAddUser : string = 'addUser';
  endPointdeleteUser : string = 'deleteUser';
  Add : string = 'Add';
  Modify: string = ' Modify'

  getUrl(value : string){
     return "http://localhost:8080/"+value;
  }
   

}
