import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username= '';
    this.password= '';
    this.errorMessage = '';
  }

  public ngOnInit() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.loginService.loginout().subscribe(msg => {
          console.log(msg);
        }, error => {
          console.log(error);
        }
      );
    }
  }

  protected login() {
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Minden mezőt tölts ki!';
      return;
    }
  
    this.loginService.login(this.username, this.password).subscribe(msg => {
      console.log(msg);
      localStorage.setItem('user', this.username);

      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      this.errorMessage = 'Hibás felhasználónév vagy jelszó';
    });
  }
  

  navToRegister(){
    this.router.navigate(['/register']);
  }
}
