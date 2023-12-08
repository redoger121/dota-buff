export interface MatchShortInfo {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  duration_minutes?: number;
  duration_seconds?: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  hero_avatar?: string;
  hero_name?: string;
  start_time: number;
  version: number;
  kills: number;
  deaths: number;
  assists: number;
  skill: number;
  average_rank: number;
  rankName?: number;
  xp_per_min: number;
  gold_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  last_hits: number;
  lane: number;
  lane_role: number;
  is_roaming: number;
  cluster: number;
  leaver_status: number;
  party_size: number;
  is_radiant: boolean;
}

export interface MatchInfoWithItems {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  average_rank: null | number;
  party_size: number;
  start_time: number;
  hero_id: number;
  version: number | null;
  kills: number;
  deaths: number;
  assists: number;
  skill: null | number;
}
