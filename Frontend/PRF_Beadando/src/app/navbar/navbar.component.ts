import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User | undefined;

  constructor(private router: Router, private userService: UserService, private loginService: LoginService){}

  userString: string | null = localStorage.getItem('user');
  loggedInUser: User | undefined;

  loggedInAccesLevel: string = '';

  ngOnInit(): void {
   if (this.userString) {
      const username = this.userString;
      this.userService.getUser(username).subscribe(
        (user) => {
          this.loggedInUser = user;
          console.log(this.loggedInUser);
          console.log(this.loggedInUser.accesLevel);
          this.loggedInAccesLevel = this.loggedInUser.accesLevel

        },
        (error) => console.log(error)
      );
    } else {
      // handle case where there is no user data in local storage
    }
  }
  

  protected goToAdminTeams() {
    this.router.navigate(['/admin-teams']);
  } 

  protected goToAdminPlayers() {
    this.router.navigate(['/admin-players']);
  } 

  protected goToAdminUsers() {
    this.router.navigate(['/admin-users']);
  } 

  protected goToHome() {
    this.router.navigate(['/home']);
  } 

  protected goToProfile() {
    this.router.navigate(['/profile']);
  } 

  onLogoutClick() {

    localStorage.removeItem('user');
      this.loginService.loginout().subscribe(msg => {
          console.log(msg);
        }, error => {
          console.log(error);
          console.log("hiba kilepeskor");
        }
      );
      this.router.navigate(['/login']);

  }

}
