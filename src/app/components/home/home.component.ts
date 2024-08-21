import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  otpForm: any;

  constructor(private fb: FormBuilder, private httpService: GlobalService, private toastr: ToastrService, private router: Router ) {
    this.otpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendOTP() {
    if (this.otpForm.valid) {
      const email = this.otpForm.get('email').value;

      localStorage.setItem('email', email);

      this.httpService.sendOTP(email).subscribe(
        (response: any) => {
          if (response.success) {
            this.toastr.success('OTP sent successfully!', `Your OTP is: ${response.otp}`);
            this.router.navigate(['/verify-otp']);
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
          console.error('Error generating OTP:', error);
        }
      );
    } else {
      this.toastr.error('Please enter a valid email');
    }
  }
}