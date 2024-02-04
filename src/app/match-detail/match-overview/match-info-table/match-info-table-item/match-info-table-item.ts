import { Component, Input } from "@angular/core";
import { Player } from "src/app/shared/models/match-full-info.model";
import { HeroResponseData } from "src/app/shared/services/data-storage.service";
import { localizedRanks } from 'src/app/shared/local-data/localized-ranks';
import { ItemFullInfo } from "src/app/shared/models/items-full-info.model";
import { AbilitiesFullInfo } from "src/app/shared/models/abilities.model";
@Component({
    selector: 'tr[app-match-info-table-item]',
    templateUrl:'./match-info-table-item.html',
    styleUrls: ['./match-info-table-item.css', '../match-info-table.component.css']
})

export class MatchInfoTableItemComponent{
    @Input() player!: Player;
    @Input() heroes!: HeroResponseData;
    ranksLocalized = localizedRanks;
    @Input() itemFullInfo!: ItemFullInfo;
    @Input() itemIds!: { [key: number]: string };
    @Input() abilitiesFullInfo!: AbilitiesFullInfo;
}