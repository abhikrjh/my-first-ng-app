import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../custom-validators';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,
    private userService: UserServiceService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerUser();
    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }


  registerUser() {
    const reqObj = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPasword,
      role: this.registerForm.value.role
    }

    console.log(reqObj);
    if (this.registerForm.value.username != "" && this.registerForm.value.password
      && this.registerForm.value.confirmPasword != "" && this.registerForm.value.role != "") {
      this.register(reqObj);
    } else {
      alert("Some fields are blank");
    }

  }

  register(reqObj) {
    this.httpClient.post(this.userService.getUrl(this.userService.endPointRegisterUser), reqObj).subscribe((data: any) => {
      alert("SucessFully Registered!! Please");
      this.router.navigate(['/login']);
    }, error => {
      this.router.navigate(['/registerUser']);
    });
  }
}
