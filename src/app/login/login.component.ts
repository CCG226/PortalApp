import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../SERVICES/account.service';
import { LoginCreds } from '../INTERFACES/LoginCreds';
import { ValidatorService } from '../SERVICES/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  isEmailInvalid: boolean = false;
  isPasswordInvalid: boolean = false;

  serverError: string = "";

  loginAttempt: LoginCreds = {
    Email: "",
    Password: ""
  }

  constructor(private accountService: AccountService, private validatorService: ValidatorService, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
   
  }

  SignIn() {
    if (this.ValidateCreds(this.loginAttempt.Email, this.loginAttempt.Password) == false) {
      console.error('Client Login Failed: Bad Input');
      return;
    }
    this.accountService.login(this.loginAttempt).subscribe(
      (data) => {
        console.log('Login Successful:');
        this.serverError = "";
        this.dialogRef.close();
      },
      (error) => {
        if (error.status === 404) {
          this.serverError = "Invalid Email Credentials";
        }
       else if (error.status === 401) {
          this.serverError = "Invalid Password Credentials";
        }
        else {
          this.serverError = "Server Error Occured";
        }
        console.error('Server Login Failed:', error);

      }
    );
  
  }
  ValidateCreds(email: string, password: string): boolean {
    this.isEmailInvalid = false;
    this.isPasswordInvalid = false;
  
    if (this.validatorService.EmailValidator(email) == false) {
  
      this.isEmailInvalid = true;
    }
  
    if (this.validatorService.PasswordValidator(password) == false) {
      this.isPasswordInvalid = true;
    }
 
    if (this.isEmailInvalid == false && this.isPasswordInvalid == false) {
      return true;
    }
    
    return false;
  
  }
}
