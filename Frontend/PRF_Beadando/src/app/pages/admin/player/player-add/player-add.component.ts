import { Player } from 'src/app/Model/player.model';
import { PlayerService } from './../../../../services/player.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ExampleService } from 'src/app/services/example.service';
import { Team } from 'src/app/Model/team.model';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

  errorMessage: string ='';
  players: Player[] | undefined;
  teams: Team[] = [];


  player: Player = {
    playername: '',
    value: 0,
    goals: 0,
    country: '',
    teamname: ''
  };

  constructor(private playerService: PlayerService, private router: Router, private palyerService: PlayerService, private exampleService: ExampleService) { }

  ngOnInit() {
    this.exampleService.getTeams().subscribe(
      (response: Team[]) => {
        this.teams = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  onSubmit(form: NgForm) {
    this.playerService.addPlayer(this.player).subscribe(
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
  
    this.router.navigate(['/admin-players']);
  }
  

  goToBack() {
    this.router.navigate(['/admin-players']);

  }


  }

