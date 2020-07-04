import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import {UserServiceService} from './user-service.service';
import { BasicAuthHttpInterceptorService } from './basic-auth-http-interceptor.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGuard } from './auth.guard';
import { LoginService } from './login.service';
import { Routes, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    EmployeeListComponent,
    PageNotFoundComponent,
    AddEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    CommonModule,
    AppRoutingModule,
  ],
  providers: [UserServiceService, LoginService,AuthGuard,
    {
    provide:HTTP_INTERCEPTORS, 
    useClass: BasicAuthHttpInterceptorService, 
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
