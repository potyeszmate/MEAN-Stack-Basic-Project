import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

    constructor(private httpClient: HttpClient) { }

    greet(){
      return this.httpClient.get(environment.url,{responseType: 'text', withCredentials: true});
    }

}
