import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from '../users/store/users.reducer';
import * as fromUsersDetailPage from '../user-detail-page/store/user-detail-page.reducer';

export interface AppState {
  players: fromUsers.State;
  usersDetailPage: fromUsersDetailPage.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  players: fromUsers.playersReducer,
  usersDetailPage: fromUsersDetailPage.UserDetailPageReducer,
};
