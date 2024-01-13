import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatchesDetailService } from './matches-detail.service';
import {
  DataStorageService,
  HeroResponseData,
} from '../shared/services/data-storage.service';
import { AbilitiesFullInfo } from '../shared/models/abilities.model';
import { ItemFullInfo } from '../shared/models/items-full-info.model';
import { localizedRanks } from '../shared/local-data/localized-ranks';
import { Subscription, mergeMap } from 'rxjs';
import { localizedGameTypes } from '../shared/local-data/localized-game-type';
import { transformTimeinSecondsToTimeInMinutes } from '../shared/functions/transformTimeinSecondsToTimeInMinutes';
import { transformDateFromNumberToString } from '../shared/functions/transformDateFromNumberToString';
import { regions } from '../shared/local-data/regions';

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
    private dataStorageService: DataStorageService
  ) {}

  matchId!: number;
  version: number | null=1;
  ranksLocalized = localizedRanks;
  radiantWin!: boolean;
  radiantScore!: number;
  direScore!: number;
  gameMode!: string;
  matchDuration!: string;
  matchEnded!: string;
  matchRegion!: string;
  paramsSubscription!: Subscription;
  get abilitiesIds(): { [key: number]: string } {
    return this.dataStorageService.abilitiesIds;
  }
  get abilitiesFullInfo(): AbilitiesFullInfo {
    return this.dataStorageService.abilitiesFullInfo;
  }

  get itemIds(): { [key: number]: string } {
    return this.dataStorageService.itemIds;
  }

  get itemFullInfo(): ItemFullInfo {
    return this.dataStorageService.itemFullInfo;
  }
  get heroes(): HeroResponseData {
    return this.dataStorageService.heroes;
  }

  ngOnInit(): void {
    this.matchId = this.rout.snapshot.params['id'];

    this.paramsSubscription = this.rout.params
      .pipe(
        mergeMap((data: Params) => {
          this.matchId = data['id'];
          const matchDetailObs = this.matchesDetailService.fetchMatchDetail(
            this.matchId
          );
          return matchDetailObs;
        })
      )
      .subscribe((response) => {
        this.radiantScore = response.radiant_score;
        this.direScore = response.dire_score;
        this.gameMode = localizedGameTypes[response.game_mode];
        this.matchDuration = transformTimeinSecondsToTimeInMinutes(
          response.duration
        );
        this.matchEnded = transformDateFromNumberToString(
          response.start_time,
          response.duration
        );
        this.matchRegion = regions[response.region];
        this.version = response.version;
        this.radiantWin = response.radiant_win;
      });
  }
  onProcessingGame(): void {
    this.router.navigate(['processing-game', this.matchId])
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
