import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute,ParamMap} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  //constructor() { };
  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router) {
  };
  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  json;
  url = "http://localhost:8080/users";
  userNameAndPass;
  onSubmit() {

    const reqObj = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.httpClient.post(this.url, reqObj).subscribe((data: any) => {
      //console.log(data);
      this.json = data.json;
      this.router.navigate(['/userlist']);
    });
  }

}
