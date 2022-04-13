import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    fname: null,
    lname: null,
    companyname:null,
    username: null,
    email: null,
    password: null,
    roleType:null,
    confirmPassword:null
  };
  rolename:any
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private activatedRoute:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    this.rolename = this.activatedRoute.snapshot.params['type'];
  }

  onSubmit(): void {
    this.form.roleType = this.rolename
    const { fname, lname, companyname, username, email, password, roleType } = this.form;

    this.authService.register(fname, lname, companyname, username, email, password,roleType).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(["/login",this.rolename]);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
