import { Component, Input } from '@angular/core';

import { Player } from 'src/app/shared/models/match-full-info.model';
import { HeroResponseData } from 'src/app/shared/services/data-storage.service';
import { ItemFullInfo } from 'src/app/shared/models/items-full-info.model';
import { AbilitiesFullInfo } from 'src/app/shared/models/abilities.model';

@Component({
  selector: 'app-match-info-table',
  templateUrl: './match-info-table.component.html',
  styleUrls: ['./match-info-table.component.css'],
})
export class MatchInforTableComponent {
  @Input() radiantWin!: boolean;
  @Input() isPermanentBuffs!: boolean;
  @Input() players!: Player[];
  @Input() heroes!: HeroResponseData;
  @Input() itemFullInfo!: ItemFullInfo;
  @Input() itemIds!: { [key: number]: string };
  @Input() abilitiesFullInfo!: AbilitiesFullInfo;
}
