import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/Model/team.model';
import { ExampleService } from 'src/app/services/example.service';

@Component({
  selector: 'app-team-update',
  templateUrl: './team-update.component.html',
  styleUrls: ['./team-update.component.css']
})
export class TeamUpdateComponent {
  constructor(private router: Router, private route: ActivatedRoute, private teamService: ExampleService) { }
  
  // team: Team | undefined;

  team: Team = {
    teamname: '',
    country: '',
    teamvalue: 0,
    stadium: ''
  };
  

  teamname:string = '';

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.teamname = params.get('id')!;
     console.log(this.teamname);
     
     this.teamService.getTeam(this.teamname)
        .subscribe((team) => {
          this.team = team;
          console.log(this.team?.teamname);
        });

    }, error => {
      console.log('param error', error);
    })
  }

  // protected onSubmit(form: any): void {
  //   this.teamService.updateTeam(this.team!.teamname!, this.team!)
  //     .subscribe(() => {
  //       console.log('Team updated successfully');
  //     });
  //     window.location.reload();

  //     this.router.navigate(['/admin-teams']);

  // }

  onSubmit(form: NgForm) {
    this.teamService.updateTeam(this.team.teamname, this.team).subscribe(
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
      this.router.navigate(['/admin-teams']);

  }

  goToBack() {
    this.router.navigate(['/admin-teams']);

  }
}
