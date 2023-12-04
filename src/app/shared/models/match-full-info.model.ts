interface pick_bans {
  hero_id: number;
  is_pick: boolean;
  order: number;
  ord: number;
  team: number;
  match_id: number;
}

interface PerMinBenchmarksStatistic {
  pct: number;
  raw: number;
}

interface benchmarks {
  gold_per_min: PerMinBenchmarksStatistic;
  xp_per_min: PerMinBenchmarksStatistic;
  kills_per_min: PerMinBenchmarksStatistic;
  last_hits_per_min: PerMinBenchmarksStatistic;
  hero_damage_per_min: PerMinBenchmarksStatistic;
  hero_healing_per_min: PerMinBenchmarksStatistic;
  tower_damage: PerMinBenchmarksStatistic;
  lhten: PerMinBenchmarksStatistic;
  stuns_per_min: PerMinBenchmarksStatistic;
}

interface BuyBackLog {
  time: number;
  slot: number;
  type: string;
  player_slot: number;
}

export interface Player {
  aganimShardEaten:boolean;
  aganimEaten:boolean;
  name: string;
  rankName?: number;
  personaname: string | null;
  ancient_kills: number;
  actions_per_min: number;
  buyback_count: number;
  courier_kills: number;
  match_id: number;
  player_slot: number;
  ability_targets: null;
  ability_upgrades_arr: number[];
  ability_uses: null;
  account_id: number;
  actions: null;
  additional_units: null;
  assists: number;
  backpack_0: number;
  backpack_1: number;
  backpack_2: number;
  backpack_3: number;
  buyback_log: BuyBackLog[];
  camps_stacked: number;
  connection_log: null;
  creeps_stacked: number;
  damage: { [key: string]: number };
  damage_inflictor: { [key: string]: number };
  damage_inflictor_received: { [key: string]: number };
  damage_taken: { [key: string]: number };
  damage_targets: { [key: string]: { [key: string]: number } };
  deaths: number;
  denies: number;
  dn_t: number[];
  firstblood_claimed: number;
  gold: number;
  gold_per_min: number;
  gold_reasons: null;
  gold_spent: number;
  gold_t: number[];
  hero_damage: number;
  hero_healing: number;
  hero_hits: { [key: string]: number };
  hero_id: number;
  hero_kills: number;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  item_neutral: number;
  item_uses: null;
  item_usage: null;
  kill_streaks: null;
  killed: { [key: string]: number };
  killed_by: { [key: string]: number };
  kills: number;
  kills_log: { time: number; key: string }[];
  lane: number;
  lane_pos: null;
  lane_efficiency: number;
  lane_efficiency_pct: number;
  lane_kills: number;
  lane_role: number;
  last_hits: number;
  last_login: string;
  leaver_status: number;
  level: number;
  lh_t: number[];
  life_state: { [key: number]: number };
  life_state_dead: number;
  max_hero_hit: null;
  multi_kills: null;
  net_worth: number;
  neutral_kills: number;
  obs: null;
  obs_left_log: null;
  obs_log: null;
  obs_placed: number;
  observer_kills: number;
  observer_uses: number;
  party_id: number;
  party_size: number;
  performance_others: null;
  permanent_buffs:
    | null
    | {
        permanent_buff: number;
        stack_count: number;
        grant_time: number;
        type?: string;
        name?: string;
      }[];
  pings: null;
  pred_vict: boolean;
  purchase: null;
  purchase_gem: number;
  randomed: boolean;
  repicked: null;
  roshans_killed: number;
  rune_pickups: number;
  runes: { [key: number]: number };
  runes_log: null;
  sen: null;
  sen_left_log: null;
  sen_log: null;
  sen_placed: number;
  sentry_kills: number;
  sentry_uses: number;
  stuns: number;
  teamfight_participation: number;
  times: number[];
  tower_damage: number;
  towers_killed: number;
  tower_kills: number;
  xp_per_min: number;
  xp_reasons: null;
  xp_t: number[];
  radiant_win: false;
  start_time: number;
  duration: number;
  cluster: number;
  lobby_type: number;
  game_mode: number;
  is_contributor: boolean;
  patch: number;
  region: number;
  isRadiant: boolean;
  win: number;
  lose: number;
  total_gold: number;
  total_xp: number;
  kills_per_min: number;
  kda: number;
  abandons: number;
  rank_tier: number;
  is_subscriber: boolean;
  cosmetics: [];
  is_roaming: boolean;
  benchmarks: benchmarks;
  purchase_time: { [key: string]: number };
  first_purchase_time: { [key: string]: number };
  purchase_log: { time: number; key: string }[];
  purchase_tpscroll: number;
  purchase_ward_observer: number;
  purchase_ward_sentry: number;
  roshan_kills: number;
}

interface PlayerInTeamFights {
  deaths_pos: {};
  ability_uses: {
    [key: string]: number;
  };
  ability_targets: {};
  item_uses: { [key: string]: number };
  killed: {
    [key: string]: number;
  };
  deaths: number;
  buybacks: number;
  damage: number;
  healing: number;
  gold_delta: number;
  xp_delta: number;
  xp_start: number;
  xp_end: number;
}

interface TeamFight {
  start: number;
  end: number;
  last_death: number;
  deaths: number;
  players: PlayerInTeamFights[];
}

interface Objective {
  key?: string;
  player_slot?: number;
  slot?: number;
  time: number;
  type: string;
  team?: number;
  unit?: number;
  value?: number;
  killer?: number;
}

interface Team {
  team_id: number;
  name: string;
  tag: string;
  logo_url: string;
}

interface DraftTiming {
  active_team: number;
  extra_time: number;
  hero_id: number;
  order: number;
  pick: boolean;
  player_slot: number | null;
  total_time_taken: number;
}

export interface MatchFullInfo {
  all_word_counts: { [key: string]: number };
  match_id: number;
  barracks_status_dire: number;
  barracks_status_radiant: number;
  chat: null;
  cluster: number;
  comeback: number;
  cosmetics: null;
  dire_score: number;
  dire_team_id: number | null;
  dire_team: Team | null;
  draft_timings: DraftTiming[];
  duration: number;
  engine: number;
  first_blood_time: number;
  game_mode: number;
  human_players: number;
  league: {
    banner: string | null;
    leagueid: number;
    name: string;
    ticket: number | null;
    tier: string;
  } | null;
  leagueid: number;
  lobby_type: number;
  match_seq_num: number;
  negative_votes: null;
  objectives: Objective[];
  picks_bans: pick_bans[];
  radiant_score: number;
  skill: null;
  start_time: number;
  players: Player[];
  patch: number;
  positive_votes: number | null;
  radiant_gold_adv: number[];
  radiant_team: Team | null;
  radiant_team_id: number | null;
  radiant_win: boolean;
  radiant_xp_adv: number[];
  region: number;
  replay_salt: number;
  replay_url?: string | null;
  series_id: number;
  series_type: number;
  stomp?: number;
  teamfights: TeamFight[];
  tower_status_dire: number;
  tower_status_radiant: number;
  version: number|null;
}
