import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router, private userService: UserServiceService) { }
  employeeList: any;
  employeeFlagValue: any;
  public buttonName: any = 'add';
  formObj = {
    id: 0,
    firstname: "",
    lastname: "",
    age: 0,
    salary: 0
  };


  ngOnInit(): void {
    this.httpClient.get(this.userService.getUrl(this.userService.endPointEmployeeList)).subscribe((data: any) => {
      this.employeeList = data;
    });

  }

  addEvent_Handler(event: any) {
    if (event) {
      this.httpClient.get(this.userService.getUrl(this.userService.endPointEmployeeList)).subscribe((data: any) => {
        this.employeeList = data;
      });
    }
  }

  modifyEvent_Handler(event: any) {
    // updating user object value of usersList having same userId as addUserFormObj userId
    if (event) {
      let employee: any;
      employee = this.employeeList.find(employee => employee.id == event.id);

      employee.firstname = event.firstname;
      employee.lastname = event.lastname;
      employee.username = event.username;
      employee.age = event.age;
      employee.salary = event.salary;
    }
  }

  setFormValue(flag: any, obj: any) {
    this.toggleButton(flag);
    if (flag) { // Add employee
      this.formObj.id = -1,
        this.formObj.firstname = '',
        this.formObj.lastname = '',
        this.formObj.age = null,
        this.formObj.salary = null
       this.employeeFlagValue = 1;
    } else { // Modify employee
      this.formObj.id = obj.id;
      this.formObj.firstname = obj.firstname,
        this.formObj.lastname = obj.lastname,
        this.formObj.age = obj.age,
        this.formObj.salary = obj.salary
      this.employeeFlagValue = 0;
    }
  }

  toggleButton(flag:any){
    // Change the name of the button
    if (flag) {
      this.buttonName = 'add';
    }else{
      this.buttonName = 'modify';
    }
  }

  deleteUser(id: any) {
    this.httpClient.post(this.userService.getUrl(this.userService.endPointdeleteEmployee), id).subscribe((data: any) => {
      this.employeeList = data;
    });
  }
}
