import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

    login(usernames: string, password: string) {
      return this.http.post(environment.url + 'login', { username: usernames, password: password }, {responseType: 'text'});
       
    }

    loginout() {
      return this.http.post(environment.url + 'logout', {}, {withCredentials: true,  responseType: 'text'}, )
    }
}
