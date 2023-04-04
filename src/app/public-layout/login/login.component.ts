import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  loadingLogin: boolean = false

  logIn(): any {
    this.loadingLogin = true
    this.authService.login({ ...this.loginForm.value }).subscribe({
      next: () => {
        this.router.navigateByUrl('users')
      },
      error: (error) => console.log('fail', error.error.message)
    })
  }

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
}
