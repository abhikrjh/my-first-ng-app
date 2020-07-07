import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  usersList:any;
  constructor(private httpClient : HttpClient, private userService : UserServiceService) { }

  ngOnInit(): void {
    this.httpClient.get(this.userService.getUrl(this.userService.endPointUsersList)).subscribe((data: any) => {
      this.usersList = data;  
    });
  }

}
