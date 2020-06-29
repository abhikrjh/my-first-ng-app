import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router, private userService: UserServiceService) { }
  usersList: any;
  userFlagValue: any;
  public buttonName: any = 'add';
  formObj = {
    userId: 0,
    firstname: "",
    lastname: "",
    username: "",
    age: 0,
    salary: 0
  };


  ngOnInit(): void {
    this.httpClient.get(this.userService.getUrl(this.userService.endPointUserList)).subscribe((data: any) => {
      this.usersList = data;
    });

  }

  addEvent_Handler(event: any) {
    if (event) {
      this.httpClient.get(this.userService.getUrl(this.userService.endPointUserList)).subscribe((data: any) => {
        this.usersList = data;
      });
    }
  }

  modifyEvent_Handler(event: any) {
    // updating user object value of usersList having same userId as addUserFormObj userId
    if (event) {
      let user: any;
      user = this.usersList.find(user => user.userId == event.userId);

      user.firstname = event.firstname;
      user.lastname = event.lastname;
      user.username = event.username;
      user.age = event.age;
      user.salary = event.salary;
    }
  }

  setFormValue(flag: any, obj: any) {
    this.toggleButton(flag);
    if (flag) { // Add user
      this.formObj.userId = -1,
        this.formObj.firstname = '',
        this.formObj.lastname = '',
        this.formObj.username = '',
        this.formObj.age = null,
        this.formObj.salary = null
       this.userFlagValue = 1;
    } else { // Modify User
      this.formObj.userId = obj.userId;
      this.formObj.firstname = obj.firstname,
        this.formObj.lastname = obj.lastname,
        this.formObj.username = obj.username,
        this.formObj.age = obj.age,
        this.formObj.salary = obj.salary
      this.userFlagValue = 0;
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
    this.httpClient.post(this.userService.getUrl(this.userService.endPointdeleteUser), id).subscribe((data: any) => {
      this.usersList = data;
    });
  }
}
