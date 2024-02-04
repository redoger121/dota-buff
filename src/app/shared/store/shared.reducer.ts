import { createReducer, on } from '@ngrx/store';

import { Hero } from '../models/heroes.model';
import * as SharedActions from './shared.actions';
import { ItemFullInfo } from '../models/items-full-info.model';
import { Lobby } from '../models/lobby-type.model';
import { AbilitiesFullInfo } from '../models/abilities.model';

export interface State {
  heroes: {
    [id: number]: Hero;
  };
  itemsIds: { [key: number]: string };
  itemsFullInfo: ItemFullInfo;
  lobbyTypes: Lobby[];
  abilitiesIds: { [key: number]: string };
  abilitiesFullInfo: AbilitiesFullInfo;
}

const initialState: State = {
  heroes: {} as {
    [id: number]: Hero;
  },
  itemsIds: {},
  itemsFullInfo: {},
  lobbyTypes: [],
  abilitiesIds: {},
  abilitiesFullInfo: {},
};

export const SharedReducer = createReducer(
  initialState,
  on(SharedActions.SetHeroes, (state, { heroes }) => ({
    ...state,
    heroes: { ...heroes },
  })),
  on(SharedActions.SetItemsIds, (state, { itemsIds }) => ({
    ...state,
    itemsIds: { ...itemsIds },
  })),
  on(SharedActions.SetItemFullInfo, (state, { itemsFullInfo }) => ({
    ...state,
    itemsFullInfo: { ...itemsFullInfo },
  })),
  on(
    SharedActions.SethResolveDataforAllmatchesComponet,
    (state, { itemsIds, itemsFullInfo, heroes }) => ({
      ...state,
      heroes: { ...heroes },
      itemsIds: { ...itemsIds },
      itemsFullInfo: { ...itemsFullInfo },
    })
  ),
  on(SharedActions.SetLobbyTypes, (state, { lobbyTypes }) => ({
    ...state,
    lobbyTypes: [...lobbyTypes],
  })),
  on(SharedActions.SetAbilitiesIds, (state, { abilitiesIds }) => ({
    ...state,
    abilitiesIds: { ...abilitiesIds },
  })),
  on(SharedActions.SetAbilitiesFullInfo, (state, { abilitiesFullInfo }) => ({
    ...state,
    abilitiesFullInfo: { ...abilitiesFullInfo },
  }))
);
