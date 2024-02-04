import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatchesDetailService } from './matches-detail.service';
import { Subscription, map, mergeMap, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  DataStorageService,
  HeroResponseData,
} from '../shared/services/data-storage.service';
import { AbilitiesFullInfo } from '../shared/models/abilities.model';
import { ItemFullInfo } from '../shared/models/items-full-info.model';
import { localizedRanks } from '../shared/local-data/localized-ranks';
import { localizedGameTypes } from '../shared/local-data/localized-game-type';
import { transformTimeinSecondsToTimeInMinutes } from '../shared/functions/transformTimeinSecondsToTimeInMinutes';
import { transformDateFromNumberToString } from '../shared/functions/transformDateFromNumberToString';
import { regions } from '../shared/local-data/regions';
import * as fromApp from '../store/app.reducer';
import * as MatchDetailActions from './store/match-detail.actions';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css'],
})
export class MatchDetailComponent implements OnInit, OnDestroy {
  constructor(
    private rout: ActivatedRoute,
    private router: Router,
    private matchesDetailService: MatchesDetailService,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}

  matchId!: number;
  version: number | null = 1;
  ranksLocalized = localizedRanks;
  radiantWin!: boolean;
  radiantScore!: number;
  direScore!: number;
  gameMode!: string;
  matchDuration!: string;
  matchEnded!: string;
  matchRegion!: string;
  paramsSubscription!: Subscription;
  abilitiesIds!: { [key: number]: string };
  abilitiesFullInfo!: AbilitiesFullInfo;
  itemIds!: { [key: number]: string };
  itemFullInfo!: ItemFullInfo;
  heroes!: HeroResponseData;
  subscription!: Subscription;
  matchAreReady: boolean=false;

  ngOnInit(): void {
    this.matchId = this.rout.snapshot.params['id'];
    this.store.dispatch(
      MatchDetailActions.SetMatchId({ matchId: this.matchId })
    );
    this.store.dispatch(MatchDetailActions.FetchMatchDetail());

    this.subscription = this.store
      .select('shared')
      .pipe(
        tap((sharedState) => {
          this.heroes = sharedState.heroes;
          this.abilitiesIds = sharedState.abilitiesIds;
          this.abilitiesFullInfo = sharedState.abilitiesFullInfo;
          this.itemIds = sharedState.itemsIds;
          this.itemFullInfo = sharedState.itemsFullInfo;
        }),
        switchMap(() => {
          return this.store.select('matchDetail');
        })
      )
      .subscribe((matchDetailState) => {
        // console.log(matchDetail.players)

        this.radiantScore = matchDetailState.matchDetail.radiant_score;
        this.direScore = matchDetailState.matchDetail.dire_score;
        this.gameMode =
          localizedGameTypes[matchDetailState.matchDetail.game_mode];
        this.matchDuration = transformTimeinSecondsToTimeInMinutes(
          matchDetailState.matchDetail.duration
        );
        this.matchEnded = transformDateFromNumberToString(
          matchDetailState.matchDetail.start_time,
          matchDetailState.matchDetail.duration
        );
        this.matchRegion = regions[matchDetailState.matchDetail.region];
        this.version = matchDetailState.matchDetail.version;
        this.radiantWin = matchDetailState.matchDetail.radiant_win;
        this.matchAreReady = matchDetailState.matchAreReady;
      });
  }
  onProcessingGame(): void {
    this.router.navigate(['processing-game', this.matchId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
