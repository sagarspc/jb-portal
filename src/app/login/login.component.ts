import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  rolename:any
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, 
    private router: Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.rolename = this.activatedRoute.snapshot.params['type'];
    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if(this.roles[0] == 'ROLE_ADMIN'){
          this.reloadAdminPage();
        }
        else
        this.reloadSeekerPage();
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  reloadAdminPage() {
    window.location.href="/dashboard"
  }
  reloadSeekerPage(): void {
    window.location.href="/job-list"
  }
}
