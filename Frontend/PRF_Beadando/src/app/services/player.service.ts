import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../Model/team.model';
import { Observable } from 'rxjs';
import { Player } from '../Model/player.model';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPlayers(teamname: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.url}/player/${teamname}`);
  }



  // POST API to add a player
  addPlayer(player: Player) {
    //return this.http.post('/api/players', player);
    return this.http.post(`${this.url}/players/`,player);

  }

  // PUT API to update a player
  updatePlayer(playername: string, player: Player) {
    //return this.http.put(`/api/players/${playername}`, player);
    return this.http.put(`${this.url}/players/${playername}`,player);
    
  }

  // GET API to list all players
  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.url}/players`);

  }
  

  // GET API to list players with a certain teamname
  getPlayersByTeam(teamname: string) {
    return this.http.get(`/api/players/${teamname}`);
  }

  // DELETE API to remove a player
  public deletePlayer(playername: string): Observable<Player> {
    return this.http.delete<Player>(`${this.url}/players/${playername}`);
  }

  getPlayer(playername: string): Observable<Player> {
    return this.http.get<Player>(`${this.url}/playerdetails/${playername}`);
  }
 
}
