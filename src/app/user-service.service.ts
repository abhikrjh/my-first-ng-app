import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  endPointAuth: string = "authenticate";
 // endPointUserList: string = 'userList';
  endPointAddEmployee: string = 'addEmployee';
  endPointdeleteEmployee: string = 'deleteEmployee';

  endPointEmployeeList: string = 'employeeList';

  Add: string = 'Add';
  Modify: string = ' Modify'

  getUrl(value: string) {
    return "http://localhost:8080/" + value;
  }


}
