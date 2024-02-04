import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { HeroResponseData } from 'src/app/shared/services/data-storage.service';
import { MatchShortInfo } from 'src/app/shared/models/match-short-info.model';
import { lobbiesLocalizedNames } from 'src/app/shared/local-data/localized-lobby-names';
import { localizedGameTypes } from 'src/app/shared/local-data/localized-game-type';
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';
import { UserPlayedWith } from 'src/app/shared/models/user-played-with.model';
import { HeroPlayedStatistic } from 'src/app/shared/models/hero-played-statistic.model';
import { Subscription, switchMap, tap } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as UserDetailPageActions from '../store/user-detail-page.actions';
@Component({
  selector: 'app-user-matches-overwiev',
  templateUrl: './user-matches-overwiev.component.html',
  styleUrls: ['./user-matches-overwiev.component.css'],
})
export class UserMatchesOverwievComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,

    private store: Store<fromApp.AppState>
  ) {}

  heroesPlayedStatistic!: HeroPlayedStatistic[];
  userId!: number;
  lastMatches!: MatchShortInfo[];
  lobbies = lobbiesLocalizedNames;
  gameType = localizedGameTypes;
  ranksLocalized = localizedRanks;
  usersPlayedWith!: UserPlayedWith[];
  userWithMaxGames: number = 0;
  heroMaxPlayed: number = 0;
  paramsSubscription!: Subscription;
  paramsSubscription2!: Subscription;
  heroes!: HeroResponseData;

  ngOnInit(): void {
    this.paramsSubscription2 = this.store
      .select('shared')
      .pipe(
        tap((sharedStte) => {
          this.heroes = sharedStte.heroes;
        }),
        switchMap(() => {
          return this.store.select('usersDetailPage');
        })
      )
      .subscribe((usersDetailPageState) => {
        this.lastMatches = usersDetailPageState.lastMatches;

        this.usersPlayedWith = usersDetailPageState.playedWith.slice(0, 5);
        usersDetailPageState.playedWith.forEach((el) => {
          if (el.games > this.userWithMaxGames) {
            this.userWithMaxGames = el.games;
          }
          
        });

        this.heroesPlayedStatistic =
          usersDetailPageState.lasrPlayedHeroes.slice(0, 10);
        this.heroesPlayedStatistic.forEach((el) => {
          if (el.games > this.heroMaxPlayed) {
            this.heroMaxPlayed = el.games;
          }
        });
      });
  }



 
  ngOnDestroy(): void {
    this.paramsSubscription2.unsubscribe();
  }
}
