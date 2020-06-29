import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  adduserForm: any;
  @Input() userFlag: any;
  @Input() addUserFormObj :any;
  @Input()  addModifyFlag : any;
  @Output() modifyUserEvent = new EventEmitter();
  @Output() addUserEvent = new EventEmitter();
  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.adduserForm = new FormGroup({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      age: new FormControl('', this.ageValidator),
      salary: new FormControl('', Validators.required),
    });
  }

  ageValidator(control) {
    if (control.value < 18) {
      return { 'age': true };
    }
  }


  addUser() {
    if (this.userFlag == 1) { // for add user
      const reqObj = {
        firstname: this.adduserForm.value.firstname,
        lastname: this.adduserForm.value.lastname,
        username: this.adduserForm.value.username,
        age: this.adduserForm.value.age,
        salary: this.adduserForm.value.salary,
      }
      this.httpClient.post(this.userService.getUrl(this.userService.endPointAddUser), reqObj).subscribe((data: any) => {
        // Inform Parent component that user has been added, Parent Component upon recieving this event,  will again fetch the fresh list from data base.
        this.addUserEvent.emit(true);
      });
    } else if (this.userFlag == 0) { // for modify user
      this.modifyUserEvent.emit(this.addUserFormObj);
    }

  }

}
