import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'meeting-list', component: MeetingListComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
