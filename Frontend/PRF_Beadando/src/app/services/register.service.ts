import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http: HttpClient) { }

  register(usernames: string, email: string, password: string){
    return this.http.post(environment.url + 'user', { username: usernames, email: email, password: password },
     {responseType: 'text'});

}

}
