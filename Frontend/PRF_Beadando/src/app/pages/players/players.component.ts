import { PlayerService } from './../../services/player.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/Model/player.model';
import { __param } from 'tslib';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit{
  players: Player[] | undefined;

  message: string = '';
  constructor(private router: Router, private route: ActivatedRoute,private playerService: PlayerService) { }

  

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
     this.message = params.get('id')!;
     console.log(this.message);
    },error => {
      console.log('param error', error);
    })

    this.playerService.getPlayers(this.message).subscribe(
      (response: Player[]) => {
        this.players = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  protected goToHome() {
    this.router.navigate(['/home']);
  }  

  protected editPlayer(player: any) {
    // Navigate to the edit page/modal with the player's details
    // For example:
    this.router.navigate(['/edit-player', player.playername]);
  }
  protected goToDetails(playername:string) {
    // Navigate to the edit page/modal with the player's details
    // For example:
    //this.router.navigate(['/edit-player', player.playername]);
    this.router.navigate(['/playerdetails', this.message, playername]);

  }
  
}
