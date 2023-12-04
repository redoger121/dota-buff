import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user-model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ProPlayer } from './pro-players.mode';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // users = new BehaviorSubject<User[]>([]);

  // proPlayers = new BehaviorSubject<ProPlayer[]>([]);
  constructor(private http: HttpClient) {}

  findUsersByName(name: string) {
    return this.http
      .get<User[]>('https://api.opendota.com/api/search', {
        params: new HttpParams().set('q', name),
      })
      // .pipe(
      //   tap((users) => {
      //     this.users.next(users);
      //     console.log(this.users);
      //   })
      // );
  }

  findProPLayers(name: string) {
    return this.http
      .get<ProPlayer[]>('https://api.opendota.com/api/proPlayers')
      .pipe(
        map((proPlayers) => {
          const foundUsers: ProPlayer[] = [];
          proPlayers.forEach((el) => {
            // console.log(el.personaname)
            if (
              el.name &&
              el.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
            ) {
              foundUsers.push(el);
            }
          });
          // this.proPlayers.next(foundUsers);
          // console.log(this.proPlayers);
          return foundUsers;
        })
      );
  }

  // getUsers() {
  //   return this.users.asObservable();
  // }

  // getProPlayers() {
  //   return this.proPlayers.asObservable();
  // }
}
