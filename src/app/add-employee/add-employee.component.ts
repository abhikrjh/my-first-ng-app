import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: any;
  @Input() employeeFlag: any;
  @Input() addEmployeeFormObj :any;
  @Input()  addModifyFlag : any;
  @Output() modifyEmployeeEvent = new EventEmitter();
  @Output() addEmployeeEvent = new EventEmitter();
  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])),
      lastname: new FormControl('', Validators.required),
      age: new FormControl('', this.ageValidator),
      salary: new FormControl('', Validators.required),
    });
  }

  ageValidator(control) {
    if (control.value < 18) {
      return { 'age': true };
    }
  }


  addEmployee() {
    if (this.employeeFlag == 1) { // for add employee
      const reqObj = {
        firstname: this.addEmployeeForm.value.firstname,
        lastname: this.addEmployeeForm.value.lastname,
        username: this.addEmployeeForm.value.username,
        age: this.addEmployeeForm.value.age,
        salary: this.addEmployeeForm.value.salary,
      }
      this.httpClient.post(this.userService.getUrl(this.userService.endPointAddEmployee), reqObj).subscribe((data: any) => {
        // Inform Parent component that user has been added, Parent Component upon recieving this event,  will again fetch the fresh list from data base.
        this.addEmployeeEvent.emit(true);
      });
    } else if (this.employeeFlag == 0) { // for modify employee
      this.modifyEmployeeEvent.emit(this.addEmployeeFormObj);
    }

  }

}
