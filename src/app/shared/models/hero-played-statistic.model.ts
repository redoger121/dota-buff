export interface HeroPlayedStatistic {
  hero_id: number;
  last_played: number;
  games: number;
  win: number;
  with_games: number;
  with_win: number;
  against_games: number;
  against_win: number;
  hero_avatar?:string;
  hero_name?:string;
  with_win_percent?:number;
}
