import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {


email: string = '';
password: string = '';
message: string = '';


constructor(private httpService: GlobalService, private router: Router, private toastr: ToastrService) { }

onSubmit() {
  if (!this.email || !this.password) {
    this.toastr.error('Email and Password are required!', 'Validation Error');
    return;
  }

  const userData = {
    email: this.email,
    password: this.password
  };

  this.httpService.login(userData).subscribe(
    (response: any) => {
      if (response.success) {
        this.message = response.message;
        console.log('Login successful:', this.message);
        localStorage.setItem('user', JSON.stringify(response.data));
        this.toastr.success('Login successful!', 'Success');
        this.router.navigate(['/meeting-list']);
      }
    },
    error => {
      if (error.status === 401) {
        this.message = 'Invalid user';
      } else {
        this.message = 'An error occurred. Please try again later.';
      }
      this.toastr.error(this.message);
      console.error('Error:', error);
    }
  );
}
}
