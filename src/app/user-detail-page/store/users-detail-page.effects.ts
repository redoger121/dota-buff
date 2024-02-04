import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as UserDetailPageActions from '../store/user-detail-page.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { UserWinLose } from '../user-win-loose-statistic.model';
import { UserAccountInfo } from '../user-account-info.model';
import {
  MatchInfoWithItems,
  MatchShortInfo,
} from 'src/app/shared/models/match-short-info.model';
import { HeroPlayedStatistic } from 'src/app/shared/models/hero-played-statistic.model';
import { UserPlayedWith } from 'src/app/shared/models/user-played-with.model';
@Injectable()
export class UsersDetailPageEffects {
  fetchPlayerWinLoseStat = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailPageActions.SetPlayerId),
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
      ofType(UserDetailPageActions.SetPlayerId),
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

  fetchUsersLastMatches = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailPageActions.SetPlayerId),
      withLatestFrom(
        this.store.select('usersDetailPage'),
        this.store.select('shared')
      ),
      switchMap(([actionData, userDetailPageState, sharedState]) => {
        return this.http
          .get<{ [id: number]: MatchShortInfo }>(
            'https://api.opendota.com/api/players/' +
              userDetailPageState.playerId +
              '/recentMatches?'
          )
          .pipe(
            map((matches) => {
              console.log(matches);
              const matchesArray: MatchShortInfo[] = [];
              for (const key in matches) {
                if (matches.hasOwnProperty(key)) {
                  matchesArray.push({ ...matches[key] });
                }
              }
              matchesArray.forEach((el) => {
                const notProcessedDuration: string = (el.duration / 60).toFixed(
                  2
                );

                el.duration_minutes = Number(
                  notProcessedDuration.split('.')[0]
                );

                el.duration_seconds = Number(
                  Number(
                    60 * (Number(notProcessedDuration.split('.')[1]) / 100)
                  ).toFixed(0)
                );
                el.rankName = Number((el.average_rank / 10).toFixed(0));
              });

              matchesArray.forEach((el) => {
                const heroAvatar = sharedState.heroes[el.hero_id];
                if (heroAvatar) {
                  el.hero_avatar = heroAvatar.img;
                  el.hero_name = heroAvatar.localized_name;
                }
              });

              return UserDetailPageActions.SetUsersLastMatches({
                lastMatches: matchesArray,
              });
            })
          );
      })
    )
  );

  fetchLastPlayedHeroes = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailPageActions.SetPlayerId),
      withLatestFrom(
        this.store.select('usersDetailPage'),
        this.store.select('shared')
      ),
      switchMap(([actionData, userDetailPageState, sharedState]) => {
        return this.http
          .get<HeroPlayedStatistic[]>(
            'https://api.opendota.com/api/players/' +
              userDetailPageState.playerId +
              '/heroes?'
          )
          .pipe(
            map((heroes) => {
              heroes.forEach((el) => {
                el.with_win_percent = Number(
                  (el.win / (el.games / 100)).toFixed(1)
                );
                heroes.forEach((el) => {
                  const heroAvatar = sharedState.heroes[el.hero_id];
                  if (heroAvatar) {
                    el.hero_avatar = heroAvatar.img;
                    el.hero_name = heroAvatar.localized_name;
                  }
                });
              });
              return UserDetailPageActions.SetLastPlayedHeroes({
                lasrPlayedHeroes: heroes,
              });
            })
          );
      })
    )
  );

  fetchUsersPlayedWith = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailPageActions.SetPlayerId),
      withLatestFrom(this.store.select('usersDetailPage')),
      switchMap(([actionData, userDetailPageState]) => {
        return this.http
          .get<UserPlayedWith[]>(
            'https://api.opendota.com/api/players/' +
              userDetailPageState.playerId +
              '/peers'
          )
          .pipe(
            map((usersData) => {
              usersData.forEach((el) => {
                el.with_win_percent = Number(
                  (el.with_win / (el.with_games / 100)).toFixed(1)
                );
              });
              return UserDetailPageActions.SetUserPlayedWith({
                playedWith: usersData,
              });
            })
          );
      })
    )
  );

  fetchAllUserMatch = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDetailPageActions.FetchAllUserMatches),
      withLatestFrom(this.store.select('usersDetailPage')),
      switchMap(([actionData, usersDetailPageState]) => {
        if (usersDetailPageState.allMatches.length !== 0) {
          this.store.dispatch(UserDetailPageActions.ClearAllMatches());
        }
        let matchesParams = new HttpParams();
        matchesParams = matchesParams.append('project', 'item_0');
        matchesParams = matchesParams.append('project', 'item_1');
        matchesParams = matchesParams.append('project', 'item_2');
        matchesParams = matchesParams.append('project', 'item_3');
        matchesParams = matchesParams.append('project', 'item_4');
        matchesParams = matchesParams.append('project', 'item_5');
        matchesParams = matchesParams.append('project', 'average_rank');
        matchesParams = matchesParams.append('project', 'party_size');
        matchesParams = matchesParams.append('project', 'duration');
        matchesParams = matchesParams.append('project', 'game_mode');
        matchesParams = matchesParams.append('project', 'lobby_type');
        matchesParams = matchesParams.append('project', 'start_time');
        matchesParams = matchesParams.append('project', 'hero_id');
        matchesParams = matchesParams.append('project', 'version');
        matchesParams = matchesParams.append('project', 'kills');
        matchesParams = matchesParams.append('project', 'deaths');
        matchesParams = matchesParams.append('project', 'assists');
        matchesParams = matchesParams.append('project', 'skill');

        return this.http.get<MatchInfoWithItems[]>(
          'https://api.opendota.com/api/players/' +
            usersDetailPageState.playerId +
            '/matches',
          { params: matchesParams }
        );
      }),
      map((allMatches) => {
        allMatches.forEach((el) => {
          const notProcessedDuration: string = (el.duration / 60).toFixed(2);

          el.duration_minutes = Number(notProcessedDuration.split('.')[0]);

          el.duration_seconds = Number(
            Number(
              60 * (Number(notProcessedDuration.split('.')[1]) / 100)
            ).toFixed(0)
          );
        });
        return UserDetailPageActions.SetAllUserMatches({
          allMatches: allMatches,
        });
      })
    )
  );
}
