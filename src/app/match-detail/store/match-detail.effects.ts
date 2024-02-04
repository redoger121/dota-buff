import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as MatchDetailActions from '../store/match-detail.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatchFullInfo } from 'src/app/shared/models/match-full-info.model';
import { Injectable } from '@angular/core';
import { permanentBuffs } from 'src/app/shared/local-data/permanent-buffs';

@Injectable()

export class MatchDetailEffects {
  fetchMatchDetail = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchDetailActions.FetchMatchDetail),
      withLatestFrom(this.store.select('matchDetail')),
      switchMap(([actionData, matchDetailState]) => {
        return this.http.get<MatchFullInfo>(
          'https://api.opendota.com/api/matches/' + matchDetailState.matchId
        );
      }),
      map((matchDetail) => {
        matchDetail.players.forEach((el) => {
            el.rankName = Number((el.rank_tier / 10).toFixed(0));
            if (el.permanent_buffs && el.permanent_buffs.length > 0) { 
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



          
          // console.log(matchDetail)
        return MatchDetailActions.SetMatchDetail({ matchDetail: matchDetail });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private http: HttpClient
  ) {}
}
