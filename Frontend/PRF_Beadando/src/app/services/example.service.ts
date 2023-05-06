import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../Model/team.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private url = 'http://localhost:3000/team';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url);
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post<any>(this.url, team);
  }

  // updateTeam(teamname: string, teamvalue: number): Observable<Team> {
  //   return this.http.put<Team>(`${this.url}/${teamname}`, { teamvalue });
  // }

   // PUT API to update a player
   updateTeam(teamname: string, team: Team) {
    //return this.http.put(`/api/players/${playername}`, player);
    return this.http.put(`${this.url}/${teamname}`,team);
  }

  deleteTeam(teamname: string): Observable<any> {
    return this.http.delete<Team>(`${this.url}/${teamname}`);
  }

  getTeam(teamname: string): Observable<Team> {
    return this.http.get<Team>(`${this.url}/${teamname}`);
  }

}
