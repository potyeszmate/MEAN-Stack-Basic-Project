import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  usernameError = '';
  emailError = '';
  passwordError = '';

  constructor(private registerService: RegisterService, private router: Router) {
   }

  ngOnInit(): void {
  }


  register() {
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';

    if (!this.username) {
      this.usernameError = 'írj be egy felhasználónevet.';
      return;
    }

    if (!this.email) {
      this.emailError = 'írj be egy email-címet.';
      return;
    } else if (!this.email.includes('@')) {
      this.emailError = 'Helytelen email-cím formátum.';
      return;
    }

    if (!this.password) {
      this.passwordError = 'írj be jelszót';
      return;
    } else if (this.password.length < 8 || !/\d/.test(this.password) || !/[a-zA-Z]/.test(this.password)) {
      this.passwordError = 'Aj elszónak legalább 8 karakter hosszúnak kell lennie és tartalmaznia kell kis és nagybetűt';
      return;
    }

    this.registerService.register(this.username, this.email, this.password)
      .subscribe(
        msg => {
          console.log(msg);
          this.router.navigate(['/login']);
        }, error => {
          console.log(error);
          this.usernameError = error.error;
        })
  }

  

  navToLogin(){
    this.router.navigate(['/login']);
  }
}
