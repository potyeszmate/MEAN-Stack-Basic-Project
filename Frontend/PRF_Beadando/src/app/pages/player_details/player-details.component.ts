import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/Model/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private router: Router) { }

  player: Player | undefined;
  
  playername: string = '';
  teamname: string = '';

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.teamname = params.get('teamid')!;
      this.playername = params.get('playerid')!;

      console.log(this.playername);
     },error => {
       console.log('param error', error);
     })

     this.playerService.getPlayer(this.playername).subscribe(player => this.player = player);

  }

  goToBack(){
    this.router.navigate(['/players',this.teamname]);

  }
}
