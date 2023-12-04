import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../models/heroes.model';
import { tap, map, Observable } from 'rxjs';
import { Lobby } from '../models/lobby-type.model';
import { lobbiesLocalizedNames } from '../local-data/localized-lobby-names';
import { AbilitiesFullInfo } from '../models/abilities.model';
import { ItemFullInfo } from '../models/items-full-info.model';

export type HeroResponseData = {
  [id: number]: Hero;
};

type LobbyResponseData = {
  [id: number]: Lobby;
};

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public heroes!: HeroResponseData;
  lobbies!: Lobby[];
  public abilitiesIds!: { [key: number]: string };
  public abilitiesFullInfo!: AbilitiesFullInfo;
  public itemIds!: { [key: number]: string };
  public itemFullInfo!: ItemFullInfo;

  constructor(private http: HttpClient) {}

  fetchHeroes() {
    return this.http
      .get<HeroResponseData>('https://api.opendota.com/api/constants/heroes')
      .pipe(
        tap((response)=>{
          this.heroes=response
        })
        // map((heroes) => {
        //   const heroesArray: Hero[] = [];
        //   for (const key in heroes) {
        //     if (heroes.hasOwnProperty(key)) {
        //       heroesArray.push({ ...heroes[key] });
        //     }
        //   }
        //   this.heroes = heroesArray;
        //   return heroesArray;
        // })
      );
  }

  fetchLobbyTypes(): Observable<Lobby[]> {
    return this.http
      .get<LobbyResponseData>(
        'https://api.opendota.com/api/constants/lobby_type'
      )
      .pipe(
        map((lobbies) => {
          const lobbiesArray: Lobby[] = [];
          for (const key in lobbies) {
            if (lobbies.hasOwnProperty(key)) {
              lobbiesArray.push({ ...lobbies[key] });
            }
          }

          lobbiesArray.forEach((el) => {
            el.localized_name = lobbiesLocalizedNames[el.id];
          });
          this.lobbies = lobbiesArray;
          return lobbiesArray;
        })
      );
  }

  fetchAbilitiesIds() {
    return this.http
      .get<{ [key: number]: string }>(
        'https://api.opendota.com/api/constants/ability_ids'
      )
      .pipe(
        tap((response) => {
          this.abilitiesIds = response;
        })
      );
  }

  fetchAbilitiesFullInfo() {
    return this.http
      .get<AbilitiesFullInfo>(
        'https://api.opendota.com/api/constants/abilities/'
      )
      .pipe(
        tap((response) => {
          this.abilitiesFullInfo = response;
        })
      );
  }

  fetchItemsIds() {
    return this.http
      .get<{ [key: number]: string }>(
        'https://api.opendota.com/api/constants/item_ids'
      )
      .pipe(
        tap((response) => {
          this.itemIds = response;
        })
      );
  }
  fetchItemsFullInfo() {
    return this.http
      .get<ItemFullInfo>('https://api.opendota.com/api/constants/items')
      .pipe(
        tap((response) => {
          this.itemFullInfo = response;
        })
      );
  }
}
