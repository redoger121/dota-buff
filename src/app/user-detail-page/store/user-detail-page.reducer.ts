import { createReducer, on } from '@ngrx/store';

import { UserAccountInfo } from '../user-account-info.model';
import { UserWinLose } from '../user-win-loose-statistic.model';
import * as UserDetailPageActions from './user-detail-page.actions';

export interface State {
  playerId: number;
  playerWinLoseInfo: UserWinLose ;
  playerAccountInfo: UserAccountInfo ;
}

const initialState: State = {
  playerId: -1,
  playerWinLoseInfo: {} as UserWinLose,
  playerAccountInfo: {} as UserAccountInfo,
};

export const UserDetailPageReducer = createReducer(
  initialState,
  on(UserDetailPageActions.SetPlayerId, (state, { userId }) => ({
    ...state,
    playerId: userId,
  })),
  on(UserDetailPageActions.SetPlayerWinLoseStat, (state, { winLoseInfo }) => ({
    ...state,
    playerWinLoseInfo: winLoseInfo,
  })),
  on(
    UserDetailPageActions.SetPlayerAccountInfo,
    (state, { playerAccountInfo }) => ({
      ...state,
      playerAccountInfo: playerAccountInfo,
    })
  )
);
