import { User } from '../user-model';
import { ProPlayer } from '../pro-players.mode';

import { createAction, props } from '@ngrx/store';

export const SetPlayersSearchBar = createAction(
  '[Users] set players search bar',
  props<{ searchBar: string }>()
);

export const FetchUsers = createAction('[Users] fetch users');

export const SetUsers = createAction(
  '[Users] set users',
  props<{ users: User[] }>()
);

export const FetchProPlayers = createAction('[Users] fetch pro-players');

export const SetProPlayers = createAction(
  '[Users] set pro-players',
  props<{ proPlayers: ProPlayer[] }>()
);

export const SetPLayersReadyStateToFalse=createAction(
  '[Users] set ready to false'
)