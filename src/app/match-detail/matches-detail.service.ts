import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatchFullInfo, Player } from '../shared/models/match-full-info.model';
import { Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchesDetailService {
  constructor(private http: HttpClient) {}

  public matchInfo = new Subject<MatchFullInfo>();
  public players = new Subject<Player[]>();

  fetchMatchDetail(matchId: number) {
    return this.http
      .get<MatchFullInfo>('https://api.opendota.com/api/matches/' + matchId)
      .pipe(
        map((response) => {
          response.players.forEach((el) => {
            el.rankName = Number((el.rank_tier / 10).toFixed(0));
          });
          return response;
        }),
        tap((response: MatchFullInfo) => {
          this.matchInfo.next(response);
          this.players.next(response.players);
        })
      );
  }

  postMachIdtoProcessing(matchId: number) {
    return this.http.post<{job:{jobId:number}}>(
      'https://api.opendota.com/api/request/' + matchId,
      matchId
    );
  }

  getMatchProcessingState(jobId: number) {
    return this.http.get('https://api.opendota.com/api/request/' + jobId, { observe: 'response' });
  }
}
