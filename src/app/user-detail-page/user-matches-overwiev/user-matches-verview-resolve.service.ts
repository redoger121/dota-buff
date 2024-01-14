import { Injectable, inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as UserDetailPageActions from '../store/user-detail-page.actions';
import * as SharedActions from '../../shared/store/shared.actions';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Hero } from 'src/app/shared/models/heroes.model';
import { map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserMatchesOverviewResolverService {
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}

  getHeroes() {
    return this.store.select('shared').pipe(
      take(1),
      map((sharedState) => {
        return sharedState.heroes;
      }),
      
      switchMap((heroes) => {
        if (Object.keys(heroes).length === 0) {
          this.store.dispatch(SharedActions.FetchHeroes());
          return this.actions$.pipe(ofType(SharedActions.SetHeroes), take(1));
        } else return of(heroes);
      })
    );
  }
}

export const UserMatchesOverviewResolver: ResolveFn<
  | {
      [id: number]: Hero;
    }
  | {
      heroes: {
        [id: number]: Hero;
      };
    }
> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(UserMatchesOverviewResolverService).getHeroes();
};
