import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';
import { Player } from 'src/app/shared/models/match-full-info.model';
import { HeroResponseData } from 'src/app/shared/services/data-storage.service';
import { AbilitiesFullInfo } from 'src/app/shared/models/abilities.model';
import { ItemFullInfo } from 'src/app/shared/models/items-full-info.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-match-overview',
  templateUrl: './match-overview.component.html',
  styleUrls: ['./match-overview.component.css'],
})
export class MatchOverViewComponent implements OnInit, OnDestroy {
  players!: Player[];
  ranksLocalized = localizedRanks;
  towerRadiantStatus!: number[];
  towerDireStatus!: number[];
  barracksRadiantSratus!: number[];
  barracksDireSratus!: number[];
  radiantWin!: boolean;
  abilityUpgardesArray: string[][] = [];
  version!: number | null;
  playersPositon: { lane: number; laneRole: number; laneKills: number }[] = [];
  radiantHardLaneCore: number = 0;
  radiantEasyLaneCore: number = 0;
  direHardLaneCore: number = 0;
  direEasyLaneCore: number = 0;
  radiantPosition: number[] = [];
  isPermanentBuffs = false;
  radiantGoldAvg!: number[];
  radiantExpAvg!: number[];
  abilitiesIds!: { [key: number]: string };
  abilitiesFullInfo!: AbilitiesFullInfo;
  itemIds!: { [key: number]: string };
  itemFullInfo!: ItemFullInfo;
  heroes!: HeroResponseData;
  subscription!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // console.log(this.players)
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
        }),
        map((matchDetailState) => {
          return matchDetailState.matchDetail;
        })
      )
      .subscribe((matchDetail) => {
        this.version = matchDetail.version;
        this.players = matchDetail.players;
        // console.log(this.players)
        // console.log(matchDetail.players);
        this.radiantGoldAvg = matchDetail.radiant_gold_adv;
        this.radiantExpAvg = matchDetail.radiant_xp_adv;
        if (this.players) {
          // console.log(this.players);
          this.players.forEach((el) => {
            if (
              el.lane === 3 &&
              el.lane_kills > this.radiantHardLaneCore &&
              el.isRadiant
            ) {
              this.radiantHardLaneCore = el.lane_kills;
            }
            if (
              el.lane === 1 &&
              el.lane_kills > this.radiantEasyLaneCore &&
              el.isRadiant
            ) {
              this.radiantEasyLaneCore = el.lane_kills;
            }
            if (
              el.lane === 3 &&
              el.lane_kills > this.direHardLaneCore &&
              !el.isRadiant
            ) {
              this.direHardLaneCore = el.lane_kills;
            }
            if (
              el.lane === 1 &&
              el.lane_kills > this.direEasyLaneCore &&
              !el.isRadiant
            ) {
              this.direEasyLaneCore = el.lane_kills;
            }

            if (el.lane && el.lane_role && el.lane_kills) {
              this.playersPositon.push({
                lane: el.lane,
                laneRole: el.lane_role,
                laneKills: el.lane_kills,
              });
            }
            if (el.permanent_buffs && el.permanent_buffs.length > 0) {
              this.isPermanentBuffs = true;
            }
          });
        }

        this.radiantWin = matchDetail.radiant_win;

        this.towerRadiantStatus = this.transformTowerDataToArray(
          matchDetail.tower_status_radiant,
          11
        );

        this.towerDireStatus = this.transformTowerDataToArray(
          matchDetail.tower_status_dire,
          11
        );

        this.barracksRadiantSratus = this.transformTowerDataToArray(
          matchDetail.barracks_status_radiant,
          6
        );

        this.barracksDireSratus = this.transformTowerDataToArray(
          matchDetail.barracks_status_dire,
          6
        );

        // console.log(this.towerRadiantStatus)
        // console.log(this.towerDireStatus)
        // console.log(this.barracksRadiantSratus)
        // console.log(this.barracksDireSratus)
      });
  }

  transformTowerDataToArray(towersBitMask: number, colOfTowers: number) {
    const towerArray: number[] = [...towersBitMask.toString(2)].map(Number);

    if (towerArray.length < colOfTowers) {
      while (towerArray.length < colOfTowers) {
        towerArray.unshift(0);
      }
    }
    return towerArray;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
