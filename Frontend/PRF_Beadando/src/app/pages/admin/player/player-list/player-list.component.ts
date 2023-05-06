import { PlayerService } from './../../../../services/player.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/Model/player.model';
import { ConnectionService } from 'src/app/services/connection.service';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {

  players: Player[] | undefined;

  playerToDelete: string = '';
  isConfirmationDialogOpen: boolean = false; // Set to false here


  constructor(private connectionService: ConnectionService ,
    private router: Router, private playerService: PlayerService) {

  }
  public ngOnInit() {
    
    this.loadPlayers();

  }

  public ngOnDestroy() {
    this.playerService.getAllPlayers().subscribe();
  }


  public loadPlayers() {
    this.playerService.getAllPlayers().subscribe(
      (response: Player[]) => {
        this.players = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  protected goToEditPlayer(playername: string) {
    this.router.navigate(['/admin-players-update', playername]);

  }

  openConfirmationDialog(playername: string) {
    this.playerToDelete = playername;
    this.isConfirmationDialogOpen = true; // Set to true here
  }
  
  deletePlayer() {
    if (event) {
      // User confirmed deletion, delete the player
      this.playerService.deletePlayer(this.playerToDelete).subscribe(
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


  protected goToAddPlayer(){
    this.router.navigate(['/admin-players-add']);

  }

  goToHome(){
    this.router.navigate(['/home']);

  }
}
