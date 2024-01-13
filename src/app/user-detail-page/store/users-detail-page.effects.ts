import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as UserDetailPageActions from '../store/user-detail-page.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { UserWinLose } from '../user-win-loose-statistic.model';
import { UserAccountInfo } from '../user-account-info.model';
@Injectable()
export class UsersDetailPageEffects {
  fetchPlayerWinLoseStat = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailPageActions.FetchPlayerWinLoseStat),
      withLatestFrom(this.store.select('usersDetailPage')),
      switchMap(([actionData, userDetailPageState]) => {
        return this.http.get<UserWinLose>(
          'https://api.opendota.com/api/players/' +
            userDetailPageState.playerId +
            '/wl'
        );
      }),
      map((winLose) => {
        return UserDetailPageActions.SetPlayerWinLoseStat({
          winLoseInfo: winLose,
        });
      })
    )
  );

  fetchPlayerAccountInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailPageActions.FetchPlayerAccountInfo),
      withLatestFrom(this.store.select('usersDetailPage')),
      switchMap(([actionData, userDetailPageState]) => {
        return this.http.get<UserAccountInfo>(
          'https://api.opendota.com/api/players/' + userDetailPageState.playerId
        );
      }),
      map((accountInfo) => {
        return UserDetailPageActions.SetPlayerAccountInfo({
          playerAccountInfo: accountInfo,
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
