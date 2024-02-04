import { ProPlayer } from '../pro-players.mode';
import { User } from '../user-model';
import * as PlayersAction from './users.actions';
import { createReducer, on } from '@ngrx/store';
export interface State {
  users: User[];
  proPlayers: ProPlayer[];
  searchBar: string;
  playersAreReady: boolean;
  proPlayersAreReady: boolean;
}
const initialState: State = {
  users: [],
  proPlayers: [],
  searchBar: '',
  playersAreReady: false,
  proPlayersAreReady: false,
};

export const playersReducer = createReducer(
  initialState,
  on(PlayersAction.SetUsers, (state, { users }) => ({
    ...state,
    users: [...users],
    playersAreReady: true,
  })),
  on(PlayersAction.SetProPlayers, (state, { proPlayers }) => ({
    ...state,
    proPlayers: [...proPlayers],
    proPlayersAreReady: true,
  })),
  on(PlayersAction.SetPlayersSearchBar, (state, { searchBar }) => ({
    ...state,
    searchBar: searchBar,
    playersAreReady: false,
    proPlayersAreReady: false,
  })),
  on(PlayersAction.FetchUsers, (state) => ({
    ...state,
    playersAreReady: false,
  })),
  on(PlayersAction.FetchProPlayers, (state) => ({
    ...state,
    proPlayersAreReady: false,
  })),
 
);
