import { Component, Input, OnInit } from '@angular/core';

import { AbilitiesFullInfo } from 'src/app/shared/models/abilities.model';
import { Player } from 'src/app/shared/models/match-full-info.model';
import { HeroResponseData } from 'src/app/shared/services/data-storage.service';
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';

@Component({
  selector: 'tr[app-match-abilities-table-item]',
  templateUrl: './match-abilities-table-item.component.html',
  styleUrls: ['./match-abilities-table-item.component.css'],
})
export class MatchAbilitiesTableItemComponent implements OnInit {
  @Input() player!: Player;
  @Input() abilitiesFullInfo!: AbilitiesFullInfo;
  @Input() heroes!: HeroResponseData;
  @Input() abilitiesIds!: { [key: number]: string };
  ranksLocalized = localizedRanks;
  abilityUpgardesArray: string[] = new Array(25).fill('1');

  ngOnInit(): void {
    this.transformAbilitiesUpgradeToTableView(this.player);
  }

  transformAbilitiesUpgradeToTableView(player: Player) {
    if (player.ability_upgrades_arr) {
      // const arrayOFUsersAbilitiesUpgrades: string[] = new Array(25).fill('1');

      const numOfAbilitiesUpgardes: number = player.ability_upgrades_arr.length;
      const heroLevel: number = player.level;
      if (
        player.level === player.ability_upgrades_arr.length ||
        player.level >= 25
      ) {
        player.ability_upgrades_arr.forEach((el, i) => {
          this.abilityUpgardesArray[i] = this.abilitiesIds[el];
        });
      }

      if (player.level > player.ability_upgrades_arr.length) {
        player.ability_upgrades_arr.forEach((el, i) => {
          if (i < 16) {
            this.abilityUpgardesArray[i] = this.abilitiesIds[el];
          }
          if (i === 16) {
            this.abilityUpgardesArray[i + 1] = this.abilitiesIds[el];
          }
          if (i === 17) {
            this.abilityUpgardesArray[i + 2] = this.abilitiesIds[el];
          }

          if (
            i === numOfAbilitiesUpgardes - 1 &&
            numOfAbilitiesUpgardes > 18 &&
            heroLevel >= 25
          ) {
            this.abilityUpgardesArray[24] = this.abilitiesIds[el];
          }
        });
      }
    }
  }
}
