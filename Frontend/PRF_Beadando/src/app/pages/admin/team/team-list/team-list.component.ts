import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/Model/team.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { ExampleService } from 'src/app/services/example.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] | undefined;

  teamtoDelete: string = '';
  isConfirmationDialogOpen: boolean = false; // Set to false here

  public ngOnInit() {
    
    this.exampleService.getTeams().subscribe(
      (response: Team[]) => {
        this.teams = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  constructor(private connectionService: ConnectionService ,
    private router: Router, private exampleService: ExampleService) {

  }

  protected goToEditTeam(teamname: string) {
    this.router.navigate(['/admin-teams-update', teamname]);

  }


  protected goToAddTeam(){
    this.router.navigate(['/admin-teams-add']);

  }

  goToHome(){
    this.router.navigate(['/home']);

  }

  openConfirmationDialog(playername: string) {
    this.teamtoDelete = playername;
    this.isConfirmationDialogOpen = true; // Set to true here
  }
  
  deleteTeam() {
    if (event) {
      // User confirmed deletion, delete the player
      this.exampleService.deleteTeam(this.teamtoDelete).subscribe(
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
