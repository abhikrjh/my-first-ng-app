import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  endPointEmployeeList: string = 'employeeList';
  endPointAddEmployee: string = 'addEmployee';
  endPointdeleteEmployee: string = 'deleteEmployee';
  endPointRegisterUser: string = 'registerUser';
  endPointUsersList : string ='usersList';
  Add: string = 'Add';
  Modify: string = ' Modify'

  getUrl(value: string) {
    return environment.baseUrl + value;
  }


}
