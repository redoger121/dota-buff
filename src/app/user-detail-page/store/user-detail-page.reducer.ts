import { createReducer, on } from '@ngrx/store';

import { UserAccountInfo } from '../user-account-info.model';
import { UserWinLose } from '../user-win-loose-statistic.model';
import * as UserDetailPageActions from './user-detail-page.actions';
import { UserPlayedWith } from 'src/app/shared/models/user-played-with.model';
import { HeroPlayedStatistic } from 'src/app/shared/models/hero-played-statistic.model';
import {
  MatchInfoWithItems,
  MatchShortInfo,
} from 'src/app/shared/models/match-short-info.model';

export interface State {
  playerId: number;
  playerWinLoseInfo: UserWinLose;
  playerAccountInfo: UserAccountInfo;
  playedWith: UserPlayedWith[];
  lasrPlayedHeroes: HeroPlayedStatistic[];
  lastMatches: MatchShortInfo[];
  allMatches: MatchInfoWithItems[];
}

const initialState: State = {
  playerId: -1,
  playerWinLoseInfo: {} as UserWinLose,
  playerAccountInfo: {} as UserAccountInfo,
  playedWith: [],
  lasrPlayedHeroes: [],
  lastMatches: [],
  allMatches: [],
};

export const UserDetailPageReducer = createReducer(
  initialState,
  on(UserDetailPageActions.SetPlayerId, (state, { userId }) => ({
    ...state,
    playerId: userId,
    playerWinLoseInfo: {} as UserWinLose,
    playerAccountInfo: {} as UserAccountInfo,
   
  })),
  on(UserDetailPageActions.SetPlayerWinLoseStat, (state, { winLoseInfo }) => ({
    ...state,
    playerWinLoseInfo: { ...winLoseInfo },
  })),
  on(
    UserDetailPageActions.SetPlayerAccountInfo,
    (state, { playerAccountInfo }) => ({
      ...state,
      playerAccountInfo: { ...playerAccountInfo },
    })
  ),
  on(UserDetailPageActions.SetUsersLastMatches, (state, { lastMatches }) => ({
    ...state,
    lastMatches: [...lastMatches],
  })),
  on(
    UserDetailPageActions.SetLastPlayedHeroes,
    (state, { lasrPlayedHeroes }) => ({
      ...state,
      lasrPlayedHeroes: [...lasrPlayedHeroes],
    })
  ),
  on(UserDetailPageActions.SetUserPlayedWith, (state, { playedWith }) => ({
    ...state,
    playedWith: [...playedWith],
  })),
  on(
    UserDetailPageActions.SetHeroAvatarAndName,
    (state, { heroAvatar, localized_name, id }) => ({
      ...state,
    })
  ),
  on(UserDetailPageActions.SetAllUserMatches, (state, { allMatches }) => ({
    ...state, allMatches: [...allMatches]
  })),
  on(UserDetailPageActions.ClearAllMatches, (state)=>({
    ...state, allMatches: []
  }))
);
