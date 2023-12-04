import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserWinLose } from './user-win-loose-statistic.model';
import { UserAccountInfo } from './user-account-info.model';
import { Observable, map, tap } from 'rxjs';
import { MatchShortInfo } from '../shared/models/match-short-info.model';
import { DataStorageService } from '../shared/services/data-storage.service';
import { UserPlayedWith } from '../shared/models/user-played-with.model';
import { HeroPlayedStatistic } from '../shared/models/hero-played-statistic.model';

type MatchesSHortInfoResponseData = {
  [id: number]: MatchShortInfo;
};

@Injectable({
  providedIn: 'root',
})
export class UserDetailPageServise {
  constructor(
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) {}

  getUserWinLoseStat(userId: number): Observable<UserWinLose> {
    return this.http.get<UserWinLose>(
      'https://api.opendota.com/api/players/' + userId + '/wl'
    );
  }

  fetchtUserAccountInfo(userId: number): Observable<UserAccountInfo> {
    return this.http.get<UserAccountInfo>(
      'https://api.opendota.com/api/players/' + userId
    );
  }

  fetchUsersLastMatches(userId: number): Observable<MatchShortInfo[]> {
    return this.http
      .get<MatchesSHortInfoResponseData>(
        'https://api.opendota.com/api/players/' + userId + '/recentMatches?'
      )
      .pipe(
        map((matches) => {
          const matchesArray: MatchShortInfo[] = [];
          for (const key in matches) {
            if (matches.hasOwnProperty(key)) {
              matchesArray.push({ ...matches[key] });
            }
          }

          if (!this.dataStorageService.heroes) {
            this.dataStorageService.fetchHeroes().subscribe();
          }
          matchesArray.forEach((el) => {
            const notProcessedDuration: string = (el.duration / 60).toFixed(2);

            el.duration_minutes = Number(notProcessedDuration.split('.')[0]);

            el.duration_seconds = Number(
              Number(
                60 * (Number(notProcessedDuration.split('.')[1]) / 100)
              ).toFixed(0)
            );
            el.rankName = Number((el.average_rank / 10).toFixed(0));
          });

          return matchesArray;
        })
      );
  }

  fetchUsersPlayedWith(userId: number): Observable<UserPlayedWith[]> {
    return this.http
      .get<UserPlayedWith[]>(
        'https://api.opendota.com/api/players/' + userId + '/peers'
      )
      .pipe(
        map((usersData) => {
          usersData.forEach((el) => {
            el.with_win_percent = Number(
              (el.with_win / (el.with_games / 100)).toFixed(1)
            );
          });
          return usersData;
        })
      );
  }

  fetchLastPlayedHeroes(userId: number): Observable<HeroPlayedStatistic[]> {
    return this.http
      .get<HeroPlayedStatistic[]>(
        'https://api.opendota.com/api/players/' + userId + '/heroes?'
      )
      .pipe(
        map((heroes) => {
          heroes.forEach((el) => {
            el.with_win_percent = Number(
              (el.win / (el.games / 100)).toFixed(1)
            );
          });
          return heroes;
        })
      );
  }
}
