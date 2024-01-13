import { Component, OnInit } from '@angular/core';
import { Subscription, forkJoin, from, map, mergeMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserDetailPageServise } from '../user-detail-page.service';
import { UserAccountInfo } from '../user-account-info.model';
import { UserWinLose } from '../user-win-loose-statistic.model';
import { starsUrsl, rankUrls } from '../../shared/local-data/ranksUrls';
import * as fromApp from '../../store/app.reducer';
import * as UserDetailPageActions from '../store/user-detail-page.actions';
@Component({
  selector: 'app-user-detail-top-info',
  templateUrl: './user-detail-top-info.component.html',
  styleUrls: ['./user-detail-top-info.component.css'],
})
export class UserDetailTopInfoComponent implements OnInit {
  // @Input() userId!: number;
  constructor(
    private userDetailService: UserDetailPageServise,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  userAccountInfo!: UserAccountInfo;

  userId!: number;
  paramsSubscription!: Subscription;
  rank = '';
  stars = '';
  leaderboard_rank!: number;
  userWinLoseStat!: UserWinLose;
  percentOfWins!: string;
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    // this.paramsSubscription = this.route.params
    //   .pipe(
    //     mergeMap((params: Params) => {
    //       this.userId = params['id'];
    //       const userWinLoseStatObs = this.userDetailService.getUserWinLoseStat(
    //         this.userId
    //       );
    //       const userAccountInfoObs =
    //         this.userDetailService.fetchtUserAccountInfo(this.userId);
    //       return forkJoin([userWinLoseStatObs, userAccountInfoObs]);
    //     })
    //   )
    this.paramsSubscription = this.store
      .select('usersDetailPage')
      .pipe(
        map((userDetailPageState) => {
          return {
            winLose: userDetailPageState.playerWinLoseInfo,
            accountInfo: userDetailPageState.playerAccountInfo,
          };
        })
      )
      .subscribe((response) => {
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
      });
  }
}
