import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatchShortInfo } from 'src/app/shared/models/match-short-info.model';
import { lobbiesLocalizedNames } from 'src/app/shared/local-data/localized-lobby-names';
import { localizedGameTypes } from 'src/app/shared/local-data/localized-game-type';
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';
import { Hero } from 'src/app/shared/models/heroes.model';
@Component({
  selector: 'tr[app-last-match-item]',
  templateUrl: './last-match-item.html',
  styleUrls: [
    './last-match-item.css',
    '../../user-matches-overwiev.component.css',
  ],
})
export class LastMatchItemComponent {
  @Input() lastMatche!: MatchShortInfo;
  @Input() heroe!: Hero;
  lobbies = lobbiesLocalizedNames;
  gameType = localizedGameTypes;
  ranksLocalized = localizedRanks;

  constructor(private router: Router) {}

  goToMatchDetail(matchId: number) {
    this.router.navigate(['matches', matchId, 'overview']);
  }
}
