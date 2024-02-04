import { createAction, props } from "@ngrx/store";
import { MatchFullInfo } from "src/app/shared/models/match-full-info.model";




export const SetMatchId=createAction(
    '[match-detail] set match id',
    props<{matchId:number}>()
)

export const FetchMatchDetail=createAction(
    '[match-detail] fetch match detail'
)

export const SetMatchDetail= createAction(
    '[match-detail] set match detail',
    props<{matchDetail:MatchFullInfo}>()
)


