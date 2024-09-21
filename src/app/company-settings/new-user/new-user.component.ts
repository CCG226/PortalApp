import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewUser } from '../../INTERFACES/NewUser';
import { AccountService } from '../../SERVICES/account.service';
import { EventService } from '../../SERVICES/event.service';
import { ValidatorService } from '../../SERVICES/validator.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  isPasswordInvalid: boolean = false;
  isEmailInvalid: boolean = false;
  isFirstNameInvalid: boolean = false;
  isLastNameInvalid: boolean = false;
  isRoleInvalid: boolean = false;
  serverResults: string = "";
  newUser: NewUser = {
    Email: "",
    Password: "",
    CompanyRole: "General",
    FirstName: "",
    LastName: ""

  }
  RegisterEventsubscription: Subscription;
  constructor(private eventService: EventService, private accountService: AccountService, private validatorService: ValidatorService) {
    this.RegisterEventsubscription = this.eventService.recieveRegisterEvent().subscribe(() => {
      this.Register();
    })

  }
  Register() {
    if (this.ValidateNewUser(this.newUser.Email, this.newUser.Password, this.newUser.CompanyRole, this.newUser.FirstName, this.newUser.LastName) == false) {
      console.error('Client Register Failed: Bad Input');
      return;
    }
    this.accountService.register(this.newUser).subscribe(
      (data) => {
        console.log('Register Successful:');
        this.serverResults = "200";
        this.newUser = {
          Email: "",
          Password: "",
          CompanyRole: "General",
          FirstName: "",
          LastName: ""
        }
      },
      (error) => {
        console.error('Server Register Failed:', error);
        if (error.status == 401) {
          this.serverResults = "401";
        }
        else if (error.status == 422) {
          this.serverResults = "422";
        }
        else {
          this.serverResults = "BAD";
        }
      }
    );

  }
  ValidateNewUser(email: string, password: string, role: string, fName: string, lName: string): boolean {
    this.isEmailInvalid = false;
    this.isPasswordInvalid = false;
    this.isFirstNameInvalid = false;
    this.isLastNameInvalid = false;
    this.isRoleInvalid = false;

    if (this.validatorService.EmailValidator(email) == false) {

      this.isEmailInvalid = true;
    }

    if (this.validatorService.PasswordValidator(password) == false) {
      this.isPasswordInvalid = true;
    }

    if (this.validatorService.RoleValidator(role) == false) {
      this.isRoleInvalid = true;
    }
    if (this.validatorService.NameValidator(fName) == false) {
      this.isFirstNameInvalid = true;
    }
    if (this.validatorService.NameValidator(lName) == false) {
      this.isLastNameInvalid = true;
    }
    if (this.isEmailInvalid == false && this.isPasswordInvalid == false && this.isFirstNameInvalid == false && this.isLastNameInvalid == false && this.isRoleInvalid == false) {
      return true;
    }

    return false;


  }
}
