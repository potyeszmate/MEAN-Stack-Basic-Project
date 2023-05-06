import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/Model/team.model';
import { ExampleService } from 'src/app/services/example.service';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent {
  team: Team = {
    teamname: '',
    country: '',
    teamvalue: 0,
    stadium: ''
  };
  errorMessage: string ='';


  constructor(private teamService: ExampleService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.teamService.createTeam(this.team).subscribe(
      res => {
        console.log(res);
        form.reset();
        window.location.reload();


      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message;

        window.location.reload();

      }

      
    );
    //window.location.reload();

    this.router.navigate(['/admin-teams']);


  }

  goToBack() {
    this.router.navigate(['/admin-teams']);

  }

  // set an initial value to disable the submit button
disableSubmitButton = true;

// function to check if all required fields have a value
checkAllFieldsAreFilled() {
  if (this.team.teamname && this.team.country && this.team.teamvalue && this.team.stadium) {
    // enable the submit button
    this.disableSubmitButton = false;
  } else {
    // disable the submit button
    this.disableSubmitButton = true;
  }
}

}
