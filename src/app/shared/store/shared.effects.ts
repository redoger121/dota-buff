import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as SharedActions from './shared.actions';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/heroes.model';
import { ItemFullInfo } from '../models/items-full-info.model';
import { AbilitiesFullInfo } from '../models/abilities.model';
import { lobbiesLocalizedNames } from '../local-data/localized-lobby-names';
import { Lobby } from '../models/lobby-type.model';
@Injectable()
export class SharedEffects {
  fetchHeros = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SharedActions.FetchHeroes,
        SharedActions.FetchResolveDataforAllmatchesComponet
      ),
      switchMap(() => {
        return this.http.get<{
          [id: number]: Hero;
        }>('https://api.opendota.com/api/constants/heroes');
      }),
      map((heroes) => {
        return SharedActions.SetHeroes({ heroes: heroes });
      })
    )
  );

  fetcItemsIds = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SharedActions.FetchItemsIds,
        SharedActions.FetchResolveDataforAllmatchesComponet
      ),
      switchMap(() => {
        return this.http.get<{ [key: number]: string }>(
          'https://api.opendota.com/api/constants/item_ids'
        );
      }),
      map((itemsIds) => {
        return SharedActions.SetItemsIds({ itemsIds: itemsIds });
      })
    )
  );

  fetchItemsFullInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SharedActions.FetchItemsFullInfo,
        SharedActions.FetchResolveDataforAllmatchesComponet
      ),
      switchMap(() => {
        return this.http.get<ItemFullInfo>(
          'https://api.opendota.com/api/constants/items'
        );
      }),
      map((itemsFullInfo) => {
        return SharedActions.SetItemFullInfo({ itemsFullInfo: itemsFullInfo });
      })
    )
  );

  fetchAbilitiesIds = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.FetchAbilitiesIds),
      switchMap(() => {
        return this.http.get<{ [key: number]: string }>(
          'https://api.opendota.com/api/constants/ability_ids'
        );
      }),
      map((abilitiesIds) => {
        return SharedActions.SetAbilitiesIds({ abilitiesIds: abilitiesIds });
      })
    )
  );

  fetchAbilitiesFullInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.FetchAbilitiesFullInfo),
      switchMap(() => {
        return this.http.get<AbilitiesFullInfo>(
          'https://api.opendota.com/api/constants/abilities/'
        );
      }),
      map((abilitiesFullInfo) => {
        return SharedActions.SetAbilitiesFullInfo({
          abilitiesFullInfo: abilitiesFullInfo,
        });
      })
    )
  );

  fetchLobbyTypes = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.FetchLobbyTypes),
      switchMap(() => {
        return this.http.get<{ [id: number]: Lobby }>(
          'https://api.opendota.com/api/constants/lobby_type'
        );
      }),
      map((lobbyTypes) => {
        const lobbiesArray: Lobby[] = [];
        for (const key in lobbyTypes) {
          if (lobbyTypes.hasOwnProperty(key)) {
            lobbiesArray.push({ ...lobbyTypes[key] });
          }
        }
        lobbiesArray.forEach((el) => {
          el.localized_name = lobbiesLocalizedNames[el.id];
        });
        return SharedActions.SetLobbyTypes({ lobbyTypes: lobbiesArray });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}
}
