import { createReducer, on } from '@ngrx/store';

import { MatchFullInfo } from 'src/app/shared/models/match-full-info.model';
import * as MatchDetailActions from '../store/match-detail.actions';

export interface State {
  matchId: number;
  matchDetail: MatchFullInfo;
  matchAreReady:  boolean;
}

const initialState: State = {
  matchId: -1,
  matchDetail: {} as MatchFullInfo,
  matchAreReady: false,
};

export const MatchDetailRedicer = createReducer(
  initialState,
  on(MatchDetailActions.SetMatchId, (state, { matchId }) => ({
    ...state,
    matchId: matchId,
  })),
  on(MatchDetailActions.SetMatchDetail, (state, { matchDetail }) => ({
    ...state,
    matchDetail: { ...matchDetail },
    matchAreReady: true,
  })),
  on(MatchDetailActions.FetchMatchDetail, (state)=>({
    ...state, matchAreReady:false
  }))
);
