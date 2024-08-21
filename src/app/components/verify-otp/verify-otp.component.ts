import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';

  constructor(private router: Router, private globalService: GlobalService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  verifyOTP() {
    const enteredOTP = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
    const email = localStorage.getItem('email');

    if (!email) {
      alert('Email not found in session. Please try again.');
      return;
    }

    this.globalService.verifyOTP(email, enteredOTP).subscribe(
      (response: any) => {
        if (response.success) {
          this.router.navigate(['/meeting-list']);
        } else {
          this.toastr.error('OTP verification failed. Please try again.');
        }
      },
      (error) => {
        console.error('Error verifying OTP', error);
        this.toastr.error('Error verifying OTP. Please try again later.');
      }
    );
  }

  resendOTP() {
    const email = sessionStorage.getItem('email');

    if (!email) {
      alert('Email not found in session. Please try again.');
      return;
    }

    this.globalService.resendOTP(email).subscribe(
      (response: any) => {
        if (response.success) {
          this.toastr.success('OTP sent successfully!', `Your OTP is: ${response.otp}`);
          this.clearOtpFields(); // Clear OTP fields after resending OTP
        } else {
          this.toastr.error('Error resending OTP. Please try again.');
        }
      },
      (error) => {
        console.error('Error resending OTP', error);
        this.toastr.error('Error resending OTP. Please try again later.');
      }
    );
  }

  clearOtpFields() {
    this.otp1 = '';
    this.otp2 = '';
    this.otp3 = '';
    this.otp4 = '';
    this.otp5 = '';
    this.otp6 = '';
  }

  moveFocus(event: any, nextInput: string): void {
    const input = event.target as HTMLInputElement;
    const maxLength = parseInt(input.maxLength.toString(), 10);

    const currentLength = input.value.length;

    if (currentLength >= maxLength) {
      const element = document.getElementsByName(nextInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  }

}
