import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as SharedActions from './shared.actions';
import { map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/heroes.model';
import { ItemFullInfo } from '../models/items-full-info.model';

@Injectable()
export class SharedEffects {
  fetchHeros = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.FetchHeroes, SharedActions.FetchResolveDataforAllmatchesComponet),
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
      ofType(SharedActions.FetchItemsIds, SharedActions.FetchResolveDataforAllmatchesComponet),
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
      ofType(SharedActions.FetchItemsFullInfo, SharedActions.FetchResolveDataforAllmatchesComponet),
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

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}
}
