import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:3000/user';

  private readonly apiUrlAdminUSerAdd = 'http://localhost:3000/useradd';


  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrlAdminUSerAdd, user);
  }
  
  // PUT API to update a player
  public updateUser(username: string, user: User) {
    //return this.http.put(`/api/players/${playername}`, player);
    return this.http.put(`${this.apiUrl}/${username}`,user);
  }

  public deleteUser(username: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${username}`);
  }

  public getUser(username: string): Observable<User> {
    //return this.http.get<User>(`/api/users/${username}`);
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

}

