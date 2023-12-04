import { Component, Input, OnInit } from '@angular/core';
import { UserDetailPageServise } from '../user-detail-page.service';
import { UserAccountInfo } from '../user-account-info.model';
import { UserWinLose } from '../user-win-loose-statistic.model';

import { Subscription, forkJoin, mergeMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-detail-top-info',
  templateUrl: './user-detail-top-info.component.html',
  styleUrls: ['./user-detail-top-info.component.css'],
})
export class UserDetailTopInfoComponent implements OnInit {
  // @Input() userId!: number;
  constructor(
    private userDetailService: UserDetailPageServise,
    private route: ActivatedRoute
  ) {}

  userAccountInfo!: UserAccountInfo;

  rankUrls = [
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_0.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_1.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_2.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_3.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_4.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_5.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_6.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_7.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_8.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_8b.png',
  ];

  starsUrsl = [
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_1.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_2.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_3.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_4.png',
    'https://www.opendota.com/assets/images/dota2/rank_icons/rank_star_5.png',
  ];
  userId!: number;
  paramsSubscription!: Subscription;
  rank = '';
  stars = '';
  leaderboard_rank!: number;
  userWinLoseStat!: UserWinLose;
  percentOfWins!: string;
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    this.paramsSubscription = this.route.params
      .pipe(
        mergeMap((params: Params) => {
          this.userId = params['id'];
          const userWinLoseStatObs = this.userDetailService.getUserWinLoseStat(
            this.userId
          );
          const userAccountInfoObs =
            this.userDetailService.fetchtUserAccountInfo(this.userId);
          return forkJoin([userWinLoseStatObs, userAccountInfoObs]);
        })
      )
      .subscribe((response) => {
        // в записываем статистику побед поражений
        this.userWinLoseStat = response[0];
        this.percentOfWins = (
          response[0].win /
          ((response[0].lose + response[0].win) / 100)
        ).toFixed(2);
        //записываем информацию профиля
        this.userAccountInfo = response[1];
        // разбираем рэйтинг пользователя состоящий из 2 цифр, для отображения иконки звания
        if (response[1].rank_tier) {
          let rankTier: number = response[1].rank_tier;
          let digits: string[] = rankTier.toString().split('');
          let realDigits: number[] = digits.map(Number);

          if (realDigits[1] === 0) {
            this.stars = '';
          } else {
            this.stars = this.starsUrsl[realDigits[1] - 1];
          }

          if (realDigits[0] === 8 && response[1].leaderboard_rank) {
            this.rank = this.rankUrls[9];
          } else if (realDigits[0] < 8 && realDigits[0] > 0) {
            this.rank = this.rankUrls[realDigits[0]];
          }
        } else {
          this.rank = this.rankUrls[0];
        }
      });
  }
}
