import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  messages:Array<string> = []
  users = {};
  loggedUser:string;
  isConnected:boolean = true;

  constructor(private socket:Socket) {
    this.setReader();
  }

  setReader() {
    this.socket.fromEvent("message").subscribe(message=>{
      this.messages.push(message as string);
    });
    this.socket.fromEvent("user").subscribe(users=>{
      this.users = users;
    });
    this.socket.fromEvent("disconnect").subscribe(users=>{
      this.isConnected = false;
    }); 
  }

  sendVote(vote:number) {
    this.socket.emit('vote', vote);
  }

  sendName(username:string) {
    this.socket.emit('user', username);
    this.loggedUser = username;
  }

  clearVote() {
    this.socket.emit('clearvote', '');
  }

}
