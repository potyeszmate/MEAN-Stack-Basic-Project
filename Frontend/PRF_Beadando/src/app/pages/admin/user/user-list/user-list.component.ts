import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] | undefined;

  usertoDelete: string = '';
  isConfirmationDialogOpen: boolean = false; // Set to false here
  
  constructor(private connectionService: ConnectionService ,
    private router: Router, private userService: UserService) {

  }
  public ngOnInit() {
    
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  goToEditUser(username: string) {
    this.router.navigate(['/admin-users-update', username]);

  }

  deleteUser(username:string){
 
    this.userService.deleteUser(username).subscribe( 
    );
  }

  goToAddUser(){
    this.router.navigate(['/admin-users-add']);
  }

  goToHome(){
    this.router.navigate(['/home']);

  }

  
  openConfirmationDialog(playername: string) {
    this.usertoDelete = playername;
    this.isConfirmationDialogOpen = true; // Set to true here
  }
  
  deleteTeam() {
    if (event) {
      // User confirmed deletion, delete the player
      this.userService.deleteUser(this.usertoDelete).subscribe(
        (response) => {
          console.log(response);
          // Handle the response as needed
          window.location.reload();

        },
        (error) => {
          console.error(error);
          // Handle the error as needed
          window.location.reload();

        }
      );
    }
    this.isConfirmationDialogOpen = false;
  }
 
  handleDialogClosed(){
    this.isConfirmationDialogOpen = false;

  }
}
