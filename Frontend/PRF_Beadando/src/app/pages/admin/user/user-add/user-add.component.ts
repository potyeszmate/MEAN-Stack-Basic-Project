import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {


  user: User = {
    username: '',
    password: '',
    email: '',
    accesLevel: ''
  };

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userService.createUser(this.user).subscribe(
      res => {
        console.log(res);
        form.reset();
        window.location.reload();


      },
      err => {
        console.error(err);
        window.location.reload();

      }
    );
    this.router.navigate(['/admin-users']);

  }

  goToBack() {
    this.router.navigate(['/admin-users']);

  }

  
}
