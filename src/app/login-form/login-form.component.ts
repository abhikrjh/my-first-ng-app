import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthenticationService } from '../authentication.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router, private userService: UserServiceService,private authService : AuthenticationService,
    private loginService : LoginService) {
  };
  ngOnInit(): void {

  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  employeeData: any;
  validLogin: boolean = false;
  json;
  userNameAndPass;
  onSubmit() {
      
      
    // const reqObj = {
    //   username: this.loginForm.value.username,
    //   password: this.loginForm.value.password
    // }

    // this.httpClient.post(this.url, reqObj).subscribe((data: any) => {
    //   //console.log(data);
    //   this.json = data.json;
    //   this.router.navigate(['/userlist']);
    // });

    const reqObj = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.authenticate(reqObj).subscribe(res=> {
      this.employeeData = res;
      console.log(this.employeeData.jwt);
      this.validLogin =true;
      this.loginService.setUserLogedin();
      this.showEmployeeList();
    },error =>{
       this.validLogin =false;
    });

  }
  showEmployeeList(){
    this.httpClient.get(this.userService.getUrl(this.userService.endPointEmployeeList)).subscribe((data: any) => {
      //console.log(data);
      this.json = data.json;
      this.router.navigate(['/employeelist']);
    });
  }
  
  userRegister(){
    this.router.navigate(['/registerUser']);
  }

}
