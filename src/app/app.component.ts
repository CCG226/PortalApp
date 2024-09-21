import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AccountService } from './SERVICES/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isHidden: boolean = true;
  constructor(private dialog: MatDialog, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.validateUserSession().subscribe(
      (data) => {
        console.log('Validation Successful:', data);
        this.isHidden = !this.isHidden;
      },
      (error) => {
        console.error('Validation Failed:', error);
        // Handle errors here
        if (error.status == 404) {
          this.launchSignInForm();
        }
        else {
         
        }
       
      }
    );

  }

  title = 'app';


  launchSignInForm() {

    const dialogRef = this.dialog.open(LoginComponent, {
      position: {
        top: '10vh',
        left: '50vw'
      },
      panelClass: 'custom-dialog',
      hasBackdrop: true,
   
    });

    dialogRef.afterOpened().subscribe(() => {
  
  
    });
    dialogRef.afterClosed().subscribe(() => {
     
      this.isHidden = !this.isHidden;
    });
  }
}
