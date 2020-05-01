import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public service:SocketService) {}
  public username:string;
  public isUserLoggedin:boolean = false;
  public buttons = [1,2,3,4,5,8,10,12,15,18,20,25,30]
  public selectedButton:number = -1;
  public showVote:boolean = false;

  start() {
    this.service.sendName(this.username);
    this.isUserLoggedin = true;
  }

  vote(number:number) {
    this.selectedButton = number;
    this.service.sendVote(number);
  }

  clearVote() {
    this.service.clearVote();
    this.showVote = false;
  }
}
