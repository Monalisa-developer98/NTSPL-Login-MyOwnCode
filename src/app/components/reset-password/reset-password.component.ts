import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password: string = '';
  nwpassword: string = '';
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(private authService: GlobalService, private toastr: ToastrService, private router: Router) {}

  getOtp(): string {
    return `${this.otp1}${this.otp2}${this.otp3}${this.otp4}${this.otp5}${this.otp6}`;
  }

  onSubmit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.toastr.error('Email not found in local storage', 'Error');
      return;
    }

    if (this.password !== this.nwpassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    const otp = this.getOtp();
    if (otp.length !== 6) {
      this.toastr.error('Please enter a 6 digit OTP', 'Error');
      return;
    }

    this.authService.resetPassword(email, this.password, otp, this.nwpassword)
      .subscribe({
        next: response => {
          console.log(response);
          this.toastr.success('Password updated successfully');
          this.router.navigate(['/user-login']);

        },
        error: error => {
          console.error('Error updating password:', error);
          this.toastr.error('Error updating password. Please try again.', 'Error');
        }
      });
  }

  moveFocus(event: any, nextInput: string): void {
    const input = event.target as HTMLInputElement;
    const maxLength = parseInt(input.maxLength.toString(), 10);

    if (input.value.length >= maxLength) {
      const element = document.getElementsByName(nextInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

}