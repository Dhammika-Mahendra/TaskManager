import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatIconModule,ReactiveFormsModule,MatButtonModule,CommonModule,MatInputModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup; 
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      
    if (res.id != null) {
      const user = {
        id: res.id,
        role: res.role
      }
      console.log('Login successful');

      StorageService.saveUser(user); 
      StorageService.saveToken (res.jwt);

      if (StorageService.isAdminLoggedIn()) {
        console.log('Admin logged in');
        this.router.navigate(["/admin"]);
      }else if(StorageService.isEmployeeLoggedIn()){
        console.log('Employee logged in');
        this.router.navigate(["/employee"]);
      } 

      }else{
        alert('Signup failed');
      }
    })
  }
}
