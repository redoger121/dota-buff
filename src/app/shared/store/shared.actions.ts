import { createAction, props } from '@ngrx/store';
import { Hero } from '../models/heroes.model';
import { ItemFullInfo } from '../models/items-full-info.model';

export const FetchHeroes = createAction('[shared] fetch heroes');

export const SetHeroes = createAction(
  '[shared] set heroes',
  props<{
    heroes: {
      [id: number]: Hero;
    };
  }>()
);
export const FetchResolveDataforAllmatchesComponet = createAction(
  '[shared] fetch resolve Data for all matches component'
);
export const SethResolveDataforAllmatchesComponet = createAction(
  '[shared] set resolve Data for all matches component',
  props<{
    itemsIds: { [key: number]: string };
    itemsFullInfo: ItemFullInfo;
    heroes: {
      [id: number]: Hero;
    };
  }>()
);
export const FetchItemsIds = createAction('[shared] fetch items ids');

export const SetItemsIds = createAction(
  '[shared] set items ids',
  props<{ itemsIds: { [key: number]: string } }>()
);

export const FetchItemsFullInfo = createAction(
  '[shared] fetch items full info'
);

export const SetItemFullInfo = createAction(
  '[shared] set items full info',
  props<{ itemsFullInfo: ItemFullInfo }>()
);
