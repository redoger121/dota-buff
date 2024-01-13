import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as PlayersActions from './users.actions';

import * as fromApp from '../../store/app.reducer';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { User } from '../user-model';
import { ProPlayer } from '../pro-players.mode';

@Injectable()
export class PlayersEffects {
  fetchUsers = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersActions.FetchUsers),
      withLatestFrom(this.store.select('players')),
      switchMap(([actionData, playersState]) => {
        console.log(playersState);
        return this.http.get<User[]>('https://api.opendota.com/api/search', {
          params: new HttpParams().set('q', playersState.searchBar),
        });
      }),
      map((users) => {
        console.log(users);
        return PlayersActions.SetUsers({ users: users });
      })
    )
  );

  fetchProPlayers = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersActions.FetchProPlayers),
      withLatestFrom(this.store.select('players')),
      switchMap(([actionData, playersState]) => {
        // console.log(playersState)
        return this.http
          .get<ProPlayer[]>('https://api.opendota.com/api/proPlayers', {})
          .pipe(
            map((proPlayers) => {
              const foundUsers: ProPlayer[] = [];
              proPlayers.forEach((el) => {
                // console.log(el.personaname)
                if (
                  el.name &&
                  el.name
                    .toLowerCase()
                    .indexOf(playersState.searchBar.toLowerCase()) !== -1
                ) {
                  foundUsers.push(el);
                }
              });
              // this.proPlayers.next(foundUsers);
              // console.log(this.proPlayers);
              return foundUsers;
            })
          );
      }),
      map((proPlayers) => {
        //   console.log(users);
        return PlayersActions.SetProPlayers({ proPlayers: proPlayers });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
