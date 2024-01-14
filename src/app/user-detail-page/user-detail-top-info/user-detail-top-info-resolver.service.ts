import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as UserDetailPageActions from '../store/user-detail-page.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UserAccountInfo } from '../user-account-info.model';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDetailTopInfoResolverService {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private route: ActivatedRoute
  ) {}

  fetchUserData(id: number) {
    return this.store.select('usersDetailPage').pipe(
      take(1),
      map((userDetailPageState) => {
        return userDetailPageState.playerId;
      }),
      switchMap((playerId) => {
        if (playerId < 0) {
          this.store.dispatch(
            UserDetailPageActions.SetPlayerId({ userId: id })
          );

          
          return this.actions$.pipe(
          
            ofType( '[user-detail-page] fetch player acount info'),
            take(1)
          );
        } else {
          return of(playerId);
        }
      })
    );
  }
}

export const userDetailTopInfoResolver: ResolveFn<number> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(UserDetailTopInfoResolverService).fetchUserData(
    route.params['id']
  );
};
