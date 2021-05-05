import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { create } from 'socketcluster-client';

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
      hostname: 'localhost',
      port: 8000
    });

    // this.socket.transmit('notification', JSON.stringify({action: 'from-frontend', count: 5}));

    (async () => {

      let myChannel = this.socket.channel('notification');
      console.log(myChannel);
    
      // Can subscribe to the channel later as a separate step.
      myChannel.subscribe();
      await myChannel.listener('subscribe').once();
      // myChannel.state is now 'subscribed'.
      for await (let data of myChannel) {
        console.log("data from channe",data);
        this.notificationList.push(JSON.parse(data));
      }
    })();
  }

  clearNotifications() {
    this.childToParent.emit();
    this.notificationList = new Array();
  }

}

export class Notification{
  action: string;
  count: number
}
