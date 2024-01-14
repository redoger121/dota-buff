import { createAction, props } from '@ngrx/store';
import { UserWinLose } from '../user-win-loose-statistic.model';
import { UserAccountInfo } from '../user-account-info.model';
import { UserPlayedWith } from 'src/app/shared/models/user-played-with.model';
import { HeroPlayedStatistic } from 'src/app/shared/models/hero-played-statistic.model';
import { MatchInfoWithItems, MatchShortInfo } from 'src/app/shared/models/match-short-info.model';



// ______________________________________________________


export const SetPlayerId = createAction(
  '[user-detail-page] set player id',
  props<{ userId: number }>()
);

export const FetchPlayerWinLoseStat = createAction(
  '[user-detail-page] fetch player win lose statistics'
);
export const SetPlayerWinLoseStat = createAction(
  '[user-detail-page] set player win lose statistics',
  props<{ winLoseInfo: UserWinLose }>()
);

export const FetchPlayerAccountInfo = createAction(
  '[user-detail-page] fetch player acount info'
);
export const SetPlayerAccountInfo = createAction(
  '[user-detail-page] set player acount info',
  props<{ playerAccountInfo: UserAccountInfo }>()
);



// _________________________________________________________________


export const FetchUserPlayedWith = createAction(
  '[user-detail-page] fetch user played with'
);

export const SetUserPlayedWith = createAction(
  '[user-detail-page] set user played with',
  props<{ playedWith: UserPlayedWith[] }>()
);

export const FetchLastPlayedHeroes=createAction(
    '[user-detail-page] fetch user last played heroes'
)
export const SetLastPlayedHeroes=createAction(
    '[user-detail-page] set user last played heroes',
    props<{lasrPlayedHeroes:HeroPlayedStatistic[]}>()
)

export const FetchUsersLastMatches=createAction(
    '[user-detail-page] fetch user last played matches'
)
export const SetUsersLastMatches=createAction(
    '[user-detail-page] set user last played matches',
    props<{lastMatches:MatchShortInfo[]}>()
)

export const SetHeroAvatarAndName=createAction(
  '[user-detail-page] set hero avatar info',
  props<{heroAvatar:string, localized_name:string, id:number}>()
)

// ________________________________________________________________

export const FetchAllUserMatches=createAction(
  '[user-detail-page] fetch all user`s matches'
)

export const SetAllUserMatches=createAction(
  '[user-detail-page] set all user`s matches',
  props<{allMatches:MatchInfoWithItems[]}>()
)

export const ClearAllMatches=createAction(
  '[user-detail-page] ceal all matches'
)