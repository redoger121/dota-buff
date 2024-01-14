import { createReducer, on } from '@ngrx/store';

import { Hero } from '../models/heroes.model';
import * as SharedActions from './shared.actions';
import { ItemFullInfo } from '../models/items-full-info.model';

export interface State {
  heroes: {
    [id: number]: Hero;
  };
  itemsIds: { [key: number]: string };
  itemsFullInfo: ItemFullInfo;
}

const initialState: State = {
  heroes: {} as {
    [id: number]: Hero;
  },
  itemsIds: {},
  itemsFullInfo: {},
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
  )
);
