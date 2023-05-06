import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/Model/team.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { ExampleService } from 'src/app/services/example.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teams: Team[] | undefined;

  ngOnInit() {
    this.hello();
    
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

  private hello() {
    this.connectionService.greet().subscribe(data => {
      console.log('Mukodik');
    }, error => {
      console.log(error);
    });
    
    }
  protected goToPlayer(playerName: string) {
    this.router.navigate(['/players', playerName]);
  }  

  protected goToLogin() {
    this.router.navigate(['/login']);
  } 

  protected goToDetails(teamname:string) {
    this.router.navigate(['/teamdetails', teamname]);
  } 



}
