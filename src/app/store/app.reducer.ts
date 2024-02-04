import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from '../users/store/users.reducer';
import * as fromUsersDetailPage from '../user-detail-page/store/user-detail-page.reducer';
import * as fromShared from '../shared/store/shared.reducer';
import * as fromMatchDetail from '../match-detail/store/match-detail.reducer';
export interface AppState {
  players: fromUsers.State;
  usersDetailPage: fromUsersDetailPage.State;
  shared: fromShared.State;
  matchDetail: fromMatchDetail.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  players: fromUsers.playersReducer,
  usersDetailPage: fromUsersDetailPage.UserDetailPageReducer,
  shared: fromShared.SharedReducer,
  matchDetail: fromMatchDetail.MatchDetailRedicer,
};
