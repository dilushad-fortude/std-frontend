import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AGClientSocket, create } from 'socketcluster-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Output() childToParent = new EventEmitter<any>();

  constructor() { }
  private socket = null;
  public notificationList: Notification[] = new Array();

  ngOnInit(): void {
    this.socket = create({
      hostname: environment.socketHost,
      port: environment.socketPort
    });

    //this.socket.transmit('notification', JSON.stringify({action: 'from-frontend', connected: this.socket.id}));

    (async () => {

      this.socket.listener("connect").once().then(() => {
        console.log("transmiting frontend socket id to server", this.socket.id);
        this.socket.transmit('front-end-connection', JSON.stringify({ action: 'from-frontend', socketClientId: this.socket.id }));
      });


      // this.socket.listener("raw").once().then(data => {
      //   console.log("subscribe data from socket", data);
      //   this.notificationList.push(JSON.parse(data.message));
      // })


      // let myChannel = this.socket.channel('notification');

      // myChannel.subscribe();
      // await myChannel.listener('subscribe').once();
      // this.socket.transmit('notification', JSON.stringify({ action: 'from-frontend', connected: this.socket.id }));

      // // myChannel.state is now 'subscribed'.
      // for await (let data of myChannel) {
      //   this.notificationList.push(JSON.parse(data));
      //   console.log("this.socket.clientId updayed", this.socket.id);
      // }
    })();

    (async () => {
      let socketDataListner = this.socket.listener("raw");
  
      for await (let {message} of socketDataListner) {
        console.log("subscribe data from socket", message);
        this.notificationList.push(JSON.parse(message));
      }
    })();
  }

  clearNotifications() {
    this.childToParent.emit();
    this.notificationList = new Array();
  }

}

export class Notification {
  action: string;
  count: number
}
