import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';
import { User } from './models/user';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  // private socket;
  currentUser: User;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // this.initWebsocket();
}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

// initWebsocket() {
//   this.socket = new WebSocket('ws://localhost:8000/ws/foobar?subscribe-broadcast');
//   this.socket.addEventListener('open',function(){
//     console.log("connected");
//   });

//   // this.socket = new WebSocket('ws://localhost:8000/ws/foobar?subscribe-broadcast');
//   this.socket.addEventListener('message',function(data){
//     console.log(data);
//   });

//   this.socket.addEventListener('close',function(data){
//     console.log(data);
//   });
  
  
// }




}
// declare var WS4Redis: any;

// $(document).ready(function() {
//   var ws4redis = WS4Redis({
//       uri: 'ws://localhost:8000/ws/foobar?subscribe-broadcast',
//       connecting: on_connecting,
//       connected: on_connected,
//       receive_message: receiveMessage,
//       disconnected: on_disconnected,
//   });

//   // attach this function to an event handler on your site
//   function sendMessage() {
//       ws4redis.send_message('A message');
//   }

//   function on_connecting() {
//       alert('Websocket is connecting...');
//   }

//   function on_connected() {
//       ws4redis.send_message('Hello');
//   }

//   function on_disconnected(evt) {
//       alert('Websocket was disconnected: ' + JSON.stringify(evt));
//   }

//   // receive a message though the websocket from the server
//   function receiveMessage(msg) {
//       alert('Message from Websocket: ' + msg);
//   }
// });
