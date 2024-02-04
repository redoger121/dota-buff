import { Component, Input, OnInit } from '@angular/core';

import { AbilitiesFullInfo } from 'src/app/shared/models/abilities.model';
import { Player } from 'src/app/shared/models/match-full-info.model';
import { HeroResponseData } from 'src/app/shared/services/data-storage.service';
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';

@Component({
  selector: 'app-match-abilities-table',
  templateUrl: './match-abilities-table.component.html',
  styleUrls: ['./match-abilities-table.component.css'],
})
export class MatchAbilitiesTableComponent  {
  @Input() players!: Player[];
  @Input() abilitiesFullInfo!: AbilitiesFullInfo;
  @Input() heroes!: HeroResponseData;
  @Input() abilitiesIds!: { [key: number]: string };
  ranksLocalized = localizedRanks;
  abilityUpgardesArray: string[][] = [];



  
}
