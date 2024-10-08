import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatIconModule,ReactiveFormsModule,MatButtonModule,CommonModule,MatInputModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  signupForm!: FormGroup; 
  hidePassword = true;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
    ) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]], 
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }


  onSubmit() {
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      if (res.id != null) {
        this.router.navigate(["/login"]);
        alert('Signup successful');
      }else{
        alert('Signup failed');
      }
    })
  }

}
