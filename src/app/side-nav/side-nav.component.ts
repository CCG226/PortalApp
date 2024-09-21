import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../SERVICES/account.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent  {
  constructor(private accountService: AccountService) {

  }
  SignOut() {
    this.accountService.logout().subscribe(
      (data) => {
        console.log('Logout Successful:');
        window.location.reload();
      },
      (error) => {
      
        console.error('Server Logout Failed:', error);

      }
    );
  }
  
}
