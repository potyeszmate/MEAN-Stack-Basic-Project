import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private router: Router, private userService: UserService, private loginService: LoginService){}

  userString: string | null = localStorage.getItem('user');
  loggedInUser: User | undefined;

  loggedInUsername: string = '';
  loggedInEmail: string = '';
  loggedInAccesLevel: string = '';


  ngOnInit(): void {
   if (this.userString) {
      const username = this.userString;
      this.userService.getUser(username).subscribe(
        (user) => {
          this.loggedInUser = user;
          console.log(this.loggedInUser);
          console.log(this.loggedInUser.accesLevel);
          this.loggedInUsername = this.loggedInUser.username;
          this.loggedInEmail = this.loggedInUser.email;
          this.loggedInAccesLevel = this.loggedInUser.accesLevel

        },
        (error) => console.log(error)
      );
    } else {
      // handle case where there is no user data in local storage
    }
  }

  protected goToHome() {
    this.router.navigate(['/home']);
  } 
}
