import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/Model/team.model';
import { ExampleService } from 'src/app/services/example.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent {
  team: Team | undefined;

  teamname:string = "";
  constructor(private route: ActivatedRoute, private teamService: ExampleService, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.teamname = params.get('id')!;
      console.log(this.teamname);
     },error => {
       console.log('param error', error);
     })

    this.teamService.getTeam(this.teamname).subscribe(team => this.team = team);
  }

  goToHome(){
    this.router.navigate(['/home']);

  }
}
