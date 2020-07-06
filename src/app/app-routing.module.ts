import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGuard } from './auth.guard';
import { UserRegisterComponent } from './user-register/user-register.component';


const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'employeelist', component: EmployeeListComponent, canActivate: [AuthGuard] },
    { path: 'addEmployee', component: AddEmployeeComponent },
    { path: 'registerUser', component: UserRegisterComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }