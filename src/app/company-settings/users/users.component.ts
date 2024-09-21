import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { UserView } from '../../INTERFACES/UserView';
import { AccountService } from '../../SERVICES/account.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'company-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  users: UserView[] = [];
  filter: UserView[] = [];
  searchInput: string = "";


  constructor(private accountService: AccountService, private cdRef: ChangeDetectorRef) {

  }
   ngOnInit() {
     this.LoadData();

  }
  Search() {
    this.filter = this.users.filter((user) =>
      user.fullName.toLowerCase().includes(this.searchInput.toLowerCase()));
  }
  LoadData() {
    this.accountService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.filter = this.users;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Data Retrieval Failed:', error);
       
      },

    );
  }


}


