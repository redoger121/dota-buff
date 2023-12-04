export interface UserPlayedWith {
    account_id: number;
    last_played: number;
    win: number;
    games: number;
    with_win: number;
    with_games: number;
    with_win_percent:number;
    against_win: number;
    against_games: number;
    with_gpm_sum: number;
    with_xpm_sum: number;
    personaname: string;
    name: string|null;
    is_contributor: boolean;
    is_subscriber: boolean;
    last_login: string|null;
    avatar: string;
    avatarfull: string;
}
