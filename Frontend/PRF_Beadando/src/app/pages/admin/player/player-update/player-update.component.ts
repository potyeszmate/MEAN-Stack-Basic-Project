import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Player } from 'src/app/Model/player.model';
import { Team } from 'src/app/Model/team.model';
import { ExampleService } from 'src/app/services/example.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.css']
})
export class PlayerUpdateComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService, private exampleService: ExampleService) { }
  
  player: Player = {
    playername: '',
    value: 0,
    goals: 0,
    country: '',
    teamname: ''
  };

  teams: Team[] = [];


  playername: string = '';

 
  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.playername = params.get('id')!;
     console.log(this.playername);
     
     this.playerService.getPlayer(this.playername)
        .subscribe((player) => {
          this.player = player;
          console.log(this.player?.playername);
        });

    }, error => {
      console.log('param error', error);
    })

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
    this.playerService.updatePlayer(this.player.playername, this.player).subscribe(
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
      this.router.navigate(['/admin-players']);

  }

  goToBack() {
    this.router.navigate(['/admin-players']);

  }

}
