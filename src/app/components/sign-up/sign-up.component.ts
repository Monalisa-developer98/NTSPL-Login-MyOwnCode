import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  firstFormGroup: any;
  secondFormGroup: any;
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, private httpService: GlobalService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  onSubmit() {
    const userData = {
      name: this.firstFormGroup.value.firstCtrl,
      email: this.firstFormGroup.value.secondCtrl,
      password: this.secondFormGroup.value.thirdCtrl
    };

    this.httpService.addUsers(userData).subscribe(
      response => {
        this.toastr.success(response.message);
        this.router.navigate(['/user-login']);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
