import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { ExampleService } from 'src/app/services/example.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }
  
  user: User = {
    username: '',
    password: '',
    email: '',
    accesLevel: '',
  };


  username:string = '';


  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.username = params.get('id')!;
     console.log(this.username);
     
     this.userService.getUser(this.username)
        .subscribe((user) => {
          this.user = user;
          console.log(this.user?.username);
        });

    }, error => {
      console.log('param error', error);
    })
  }

  onSubmit(form: NgForm) {
    this.userService.updateUser(this.user.username, this.user).subscribe(
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
