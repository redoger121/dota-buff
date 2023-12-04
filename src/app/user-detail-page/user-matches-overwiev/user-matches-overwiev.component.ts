import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDetailPageServise } from '../user-detail-page.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Hero } from 'src/app/shared/models/heroes.model';
import {
  DataStorageService,
  HeroResponseData,
} from 'src/app/shared/services/data-storage.service';
import { MatchShortInfo } from 'src/app/shared/models/match-short-info.model';
import { lobbiesLocalizedNames } from 'src/app/shared/local-data/localized-lobby-names';
import { localizedGameTypes } from 'src/app/shared/local-data/localized-game-type';
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';
import { UserPlayedWith } from 'src/app/shared/models/user-played-with.model';
import { HeroPlayedStatistic } from 'src/app/shared/models/hero-played-statistic.model';
import { Subscription, forkJoin, mergeMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-matches-overwiev',
  templateUrl: './user-matches-overwiev.component.html',
  styleUrls: ['./user-matches-overwiev.component.css'],
})
export class UserMatchesOverwievComponent implements OnInit, OnDestroy {
  constructor(
    private userDetailService: UserDetailPageServise,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService
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
  get heroes(): HeroResponseData {
    return this.dataStorageService.heroes;
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.parent?.params['id'];
    this.paramsSubscription = this.route
      .parent!.params.pipe(
        mergeMap((data: Params) => {
          this.userId = data['id'];
          const lastMatchesObs = this.userDetailService.fetchUsersLastMatches(
            this.userId
          );
          const usersPlayedWithObs =
            this.userDetailService.fetchUsersPlayedWith(this.userId);
          const lastPlayedHeroesObs =
            this.userDetailService.fetchLastPlayedHeroes(this.userId);
          return forkJoin([
            lastMatchesObs,
            usersPlayedWithObs,
            lastPlayedHeroesObs,
          ]);
        })
      ).subscribe((response) => {
        response[0].forEach((el) => {
          const heroAvatar = this.heroes[el.hero_id];
          if (heroAvatar) {
            el.hero_avatar = heroAvatar.img;
            el.hero_name = heroAvatar.localized_name;
          }
        });

        this.lastMatches = response[0];

        this.usersPlayedWith = response[1].slice(0, 5);
        response[1].forEach((el) => {
          if (el.games > this.userWithMaxGames) {
            this.userWithMaxGames = el.games;
          }
        });
        response[2].forEach((el) => {
          const heroAvatar = this.heroes[el.hero_id];

          if (heroAvatar) {
            el.hero_avatar = heroAvatar.img;
            el.hero_name = heroAvatar.localized_name;
          }
        });

        this.heroesPlayedStatistic = response[2].slice(0, 10);
        this.heroesPlayedStatistic.forEach((el) => {
          if (el.games > this.heroMaxPlayed) {
            this.heroMaxPlayed = el.games;
          }
        });
      });
  }

  goToUserPage(accountId: number) {
    this.router.navigate(['user-datail', accountId, 'overview']);
  }

  goToMatchDetail(matchId: number) {
    this.router.navigate(['matches', matchId, 'overview']);
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}

// this.userId = this.route.snapshot.parent?.params['id'];
// this.paramsSubscription = this.route.parent!.params.subscribe(
//   (params: Params) => {
//     this.userId = params['id'];

//     this.userDetailService
//       .fetchUsersLastMatches(this.userId)
//       .subscribe((response) => {
//         // console.log(this.heroes);
//         // console.log(response);

//         response.forEach((el) => {
//           // const heroAvatar = this.heroes.find(({ id }) => {
//           //   return id === el.hero_id;
//           // });
//           // console.log(this.heroes);
//           const heroAvatar = this.heroes[el.hero_id];
//           // console.log(heroAvatar);
//           if (heroAvatar) {
//             el.hero_avatar = heroAvatar.img;
//             el.hero_name = heroAvatar.localized_name;
//           }
//         });
//         this.lastMatches = response;
//       });

//     this.userDetailService
//       .fetchUsersPlayedWith(this.userId)
//       .subscribe((response) => {
//         this.usersPlayedWith = response.slice(0, 5);
//         response.forEach((el) => {
//           if (el.games > this.userWithMaxGames) {
//             this.userWithMaxGames = el.games;
//           }
//         });
//       });

//     this.userDetailService
//       .fetchLastPlayedHeroes(this.userId)
//       .subscribe((response) => {
//         response.forEach((el) => {
//           // const heroAvatar = this.heroes.find(({ id }) => {
//           //   return id === el.hero_id;
//           // });
//           const heroAvatar = this.heroes[el.hero_id];
//           // console.log(this.heroes);
//           // console.log(heroAvatar);
//           if (heroAvatar) {
//             el.hero_avatar = heroAvatar.img;
//             el.hero_name = heroAvatar.localized_name;
//           }
//         });
//         this.heroesPlayedStatistic = response.slice(0, 10);
//         this.heroesPlayedStatistic.forEach((el) => {
//           if (el.games > this.heroMaxPlayed) {
//             this.heroMaxPlayed = el.games;
//           }
//         });
//       });
//   }
// );
