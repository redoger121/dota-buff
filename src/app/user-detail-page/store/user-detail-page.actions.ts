import { createAction, props } from "@ngrx/store";
import { UserWinLose } from "../user-win-loose-statistic.model";
import { UserAccountInfo } from "../user-account-info.model";

export const SetPlayerId=createAction(
'[user-detail-page] set player id',
props<{userId:number}>()
)

export const FetchPlayerWinLoseStat=createAction(
    '[user-detail-page] fetch player win lose statistics'
)
export const SetPlayerWinLoseStat=createAction(
    '[user-detail-page] set player win lose statistics',
    props<{winLoseInfo:UserWinLose}>()
)

export const FetchPlayerAccountInfo=createAction(
    '[user-detail-page] fetch player acount info'
)
export const SetPlayerAccountInfo=createAction(
    '[user-detail-page] set player acount info',
    props<{playerAccountInfo:UserAccountInfo}>()
)
