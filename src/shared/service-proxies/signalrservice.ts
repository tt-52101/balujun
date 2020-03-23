import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

import { AppConsts } from 'abpPro/AppConsts';

@Injectable({
    providedIn: 'root'
})

export class SignalRService {

    public hubConnection: signalR.HubConnection

    public startConnection = (groupname) => {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(AppConsts.remoteServiceBaseUrl + '/signalr')
        .build();
        this.hubConnection.start()
        .then(() => {
            this.send(groupname,'joinGroup')
        })
        .catch(err => console.log('Error while starting connection: ' + err));
    }

    public send = (username: number, message: string) => {
        this.hubConnection.send('newMessage', username, message)
        .catch(err => console.error(err));
    }

    public onclose=() =>{
        console.log('watchclosed')
        this.hubConnection.onclose((error) => {
            console.log(error)
            setTimeout(function(){
                this.startConnection()
            },3000); 
        }); 
    }
}