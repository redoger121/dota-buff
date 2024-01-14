import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {  map, of, switchMap, take } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as SharedActions from '../../shared/store/shared.actions';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ItemFullInfo } from 'src/app/shared/models/items-full-info.model';
import { Hero } from 'src/app/shared/models/heroes.model';

@Injectable({ providedIn: 'root' })
export class UsersAllMatchesResolveService {
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}

  getHeroesData() {
    return this.store.select('shared').pipe(
      take(1),
      map((sharedState) => {
        return sharedState.heroes;
      }),
      switchMap((heroes) => {
        if (Object.keys(heroes).length === 0) {
          this.store.dispatch(SharedActions.FetchHeroes());

          return this.actions$.pipe(
            ofType(SharedActions.SetHeroes),

            take(1)
          );
        } else {
          return of(heroes);
        }
      })
    );
  }

  getItemIdsData() {
    return this.store.select('shared').pipe(
      take(1),
      map((sharedState) => {
        return sharedState.itemsIds;
      }),
      switchMap((itemsIds) => {
        if (Object.keys(itemsIds).length === 0) {
          this.store.dispatch(SharedActions.FetchItemsIds());

          return this.actions$.pipe(
            ofType(SharedActions.SetItemsIds),

            take(1)
          );
        } else {
          return of(itemsIds);
        }
      })
    );
  }
  getItemsFullInfoData() {
    return this.store.select('shared').pipe(
      take(1),
      map((sharedState) => {
        return sharedState.itemsFullInfo;
      }),
      switchMap((itemsFullInfo) => {
        if (Object.keys(itemsFullInfo).length === 0) {
          console.log(1);
          this.store.dispatch(SharedActions.FetchItemsFullInfo());
          return this.actions$.pipe(
            ofType(SharedActions.SetItemFullInfo),
            take(1)
          );
        } else {
          return of(itemsFullInfo);
        }
      })
    );
  }
}

export const AllMatchesResolver: ResolveFn<
  { [id: number]: Hero } | { heroes: { [id: number]: Hero } }
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UsersAllMatchesResolveService).getHeroesData();
};
export const ItemIdsResolver: ResolveFn<
  { [key: number]: string } | { itemsIds: { [key: number]: string } }
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UsersAllMatchesResolveService).getItemIdsData();
};
export const ItemsFulInfoResolver: ResolveFn<
  { itemsFullInfo: ItemFullInfo } | ItemFullInfo
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UsersAllMatchesResolveService).getItemsFullInfoData();
};
