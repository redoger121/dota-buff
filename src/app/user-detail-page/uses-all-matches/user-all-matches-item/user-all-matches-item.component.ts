import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemFullInfo } from 'src/app/shared/models/items-full-info.model';
import { MatchInfoWithItems } from 'src/app/shared/models/match-short-info.model';
import { HeroResponseData } from 'src/app/shared/services/data-storage.service';
import { lobbiesLocalizedNames } from 'src/app/shared/local-data/localized-lobby-names';
import { localizedGameTypes } from 'src/app/shared/local-data/localized-game-type';
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';
@Component({
  selector: 'tr[app-user-all-matches-item]',
  templateUrl: './user-all-matches-item.component.html',
  styleUrls: ['./user-all-matches-item.component.css'],
})
export class UserAllMatchesItemComponent implements OnInit {
  @Input() match!: MatchInfoWithItems;
  @Input() itemIds!: { [key: number]: string };
  @Input() itemFullInfo!: ItemFullInfo;
  @Input() heroes!: HeroResponseData;
  lobbies = lobbiesLocalizedNames;
  gameType = localizedGameTypes;
  ranksLocalized = localizedRanks;
  constructor(private router: Router) {}
 averageRank:number[]=[]

ngOnInit(): void {
    if(this.match.average_rank){
        this.averageRank.push(Math.floor(this.match.average_rank/10-1))
        this.averageRank.push(this.match.average_rank%10)
    }
}

  goToMatchDetail(matchId: number) {
    this.router.navigate(['matches', matchId, 'overview']);
  }
}
