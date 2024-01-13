import { Component, OnInit } from '@angular/core';
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';
import { Player } from 'src/app/shared/models/match-full-info.model';
import { MatchesDetailService } from '../matches-detail.service';
import {
  DataStorageService,
  HeroResponseData,
} from 'src/app/shared/services/data-storage.service';
import { AbilitiesFullInfo } from 'src/app/shared/models/abilities.model';
import { ItemFullInfo } from 'src/app/shared/models/items-full-info.model';
import { permanentBuffs } from 'src/app/shared/local-data/permanent-buffs';

@Component({
  selector: 'app-match-overview',
  templateUrl: './match-overview.component.html',
  styleUrls: ['./match-overview.component.css'],
})
export class MatchOverViewComponent implements OnInit {
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
  constructor(
    private matchesDetailService: MatchesDetailService,
    private dataStorageService: DataStorageService
  ) {}

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

    console.log(this.itemFullInfo)
    this.matchesDetailService.matchInfo.subscribe((response) => {
      this.version = response.version;
      this.players = response.players;

      console.log(this.players)
      this.radiantGoldAvg = response.radiant_gold_adv;
      this.radiantExpAvg = response.radiant_xp_adv;
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
          el.permanent_buffs.forEach((buff) => {
            if (buff.permanent_buff <= 14) {
              buff.name = permanentBuffs[buff.permanent_buff].name;
              buff.type = permanentBuffs[buff.permanent_buff].type;
            }
            if (buff.permanent_buff === 2) {
              el.aganimEaten = true;
            }
            if (buff.permanent_buff === 12) {
              el.aganimShardEaten = true;
            }
          });
        }
      });

      console.log(this.playersPositon);

      this.radiantWin = response.radiant_win;
      this.towerRadiantStatus = this.transformTowerDataToArray(
        response.tower_status_radiant,
        11
      );
      this.towerDireStatus = this.transformTowerDataToArray(
        response.tower_status_dire,
        11
      );
      this.barracksRadiantSratus = this.transformTowerDataToArray(
        response.barracks_status_radiant,
        6
      );
      this.barracksDireSratus = this.transformTowerDataToArray(
        response.barracks_status_dire,
        6
      );
      this.transformAbilitiesUpgradeToTableView(this.players);
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

  transformAbilitiesUpgradeToTableView(players: Player[]) {
    players.forEach((el) => {
      const arrayOFUsersAbilitiesUpgrades: string[] = new Array(25).fill('1');

      const numOfAbilitiesUpgardes: number = el.ability_upgrades_arr.length;
      const heroLevel: number = el.level;
      if (el.level === el.ability_upgrades_arr.length || el.level >= 25) {
        el.ability_upgrades_arr.forEach((el, i) => {
          arrayOFUsersAbilitiesUpgrades[i] = this.abilitiesIds[el];
        });
      }

      if (el.level > el.ability_upgrades_arr.length) {
        el.ability_upgrades_arr.forEach((el, i) => {
          if (i < 16) {
            arrayOFUsersAbilitiesUpgrades[i] = this.abilitiesIds[el];
          }
          if (i === 16) {
            arrayOFUsersAbilitiesUpgrades[i + 1] = this.abilitiesIds[el];
          }
          if (i === 17) {
            arrayOFUsersAbilitiesUpgrades[i + 2] = this.abilitiesIds[el];
          }

          if (
            i === numOfAbilitiesUpgardes - 1 &&
            numOfAbilitiesUpgardes > 18 &&
            heroLevel >= 25
          ) {
            arrayOFUsersAbilitiesUpgrades[24] = this.abilitiesIds[el];
          }
        });
      }

      this.abilityUpgardesArray.push(arrayOFUsersAbilitiesUpgrades);
    });
  }
}
