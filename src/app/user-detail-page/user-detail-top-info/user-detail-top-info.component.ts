import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserAccountInfo } from '../user-account-info.model';
import { UserWinLose } from '../user-win-loose-statistic.model';
import { starsUrsl, rankUrls } from '../../shared/local-data/ranksUrls';
import * as fromApp from '../../store/app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail-top-info',
  templateUrl: './user-detail-top-info.component.html',
  styleUrls: ['./user-detail-top-info.component.css'],
})
export class UserDetailTopInfoComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  userAccountInfo!: UserAccountInfo;

  userId!: number;
  paramsSubscription!: Subscription;
  rank = '';
  stars = '';
  leaderboard_rank!: number;
  userWinLoseStat!: UserWinLose;
  percentOfWins!: string;
  accountInfoReady = false;
  winLoseReady = false;
  ngOnInit(): void {
    this.paramsSubscription = this.store
      .select('usersDetailPage')
      .pipe(
        map((userDetailPageState) => {
          this.accountInfoReady = false;
          this.winLoseReady = false;
          // console.log(userDetailPageState);
          return {
            winLose: userDetailPageState.playerWinLoseInfo,
            accountInfo: userDetailPageState.playerAccountInfo,
            userId: userDetailPageState.playerId,
          };
        })
      )
      .subscribe((response) => {
        console.log(response.accountInfo);
        this.userId = response.userId;
        // в записываем статистику побед поражений
        this.userWinLoseStat = response.winLose;
        this.percentOfWins = (
          response.winLose.win /
          ((response.winLose.lose + response.winLose.win) / 100)
        ).toFixed(2);
        //записываем информацию профиля
        this.userAccountInfo = response.accountInfo;

        // разбираем рэйтинг пользователя состоящий из 2 цифр, для отображения иконки звания
        if (response.accountInfo.rank_tier) {
          let rankTier: number = response.accountInfo.rank_tier;
          let digits: string[] = rankTier.toString().split('');
          let realDigits: number[] = digits.map(Number);

          if (realDigits[1] === 0) {
            this.stars = '';
          } else {
            this.stars = starsUrsl[realDigits[1] - 1];
          }

          if (realDigits[0] === 8 && response.accountInfo.leaderboard_rank) {
            this.rank = rankUrls[9];
          } else if (realDigits[0] < 8 && realDigits[0] > 0) {
            this.rank = rankUrls[realDigits[0]];
          }
        } else {
          this.rank = rankUrls[0];
        }
        if (
          Object.keys(this.userAccountInfo).length !== 0 &&
          Object.keys(this.userWinLoseStat).length !== 0
        ) {
          this.winLoseReady = true;
          this.accountInfoReady = true;
        }
      });
  }

  goToHeroesStatictic() {
    this.router.navigate(['user-datail', this.userId, 'heroes-stat']);
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
