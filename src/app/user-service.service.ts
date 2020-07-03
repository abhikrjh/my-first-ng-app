import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  endPointEmployeeList :string = 'employeeList';
  endPointAddEmployee : string = 'addEmployee';
  endPointdeleteEmployee : string = 'deleteEmployee';
  Add : string = 'Add';
  Modify: string = ' Modify'

  getUrl(value : string){
     return "http://localhost:8080/"+value;
  }
   

}
