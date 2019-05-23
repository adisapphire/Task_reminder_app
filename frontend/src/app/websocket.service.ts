import { Injectable } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private websocket;


  constructor(private authenticationservice: AuthenticationService) { }

  initwebsocket() {
    this.websocket = new WebSocket('ws://localhost:/ws/foobar?subscribe-broadcast&publish-broadcast&echo');
  }

}
