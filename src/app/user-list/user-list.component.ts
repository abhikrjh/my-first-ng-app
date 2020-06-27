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

  deleteUser(id:any){
    this.httpClient.post(this.userService.getUrl(this.userService.endPointdeleteUser),id).subscribe((data: any) => {
      this.usersList = data;
    });
    // work started.
    // new lie added
  }
  
  modifyUser(userObj:any){

    const reqObj = {
      // userId : 
      // firstname: users.firstname,
      // lastname: this.adduserForm.value.lastname,
      // username: this.adduserForm.value.username,
      // age: this.adduserForm.value.age,
      // salary: this.adduserForm.value.salary,
    }

    this.httpClient.post(this.userService.getUrl(this.userService.endPointAddUser), reqObj).subscribe((data: any) => {
      //console.log(data);
    });
  }

}
