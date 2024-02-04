import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Hero } from "src/app/shared/models/heroes.model";



import { MatchShortInfo } from "src/app/shared/models/match-short-info.model";
import { HeroResponseData } from "src/app/shared/services/data-storage.service";




@Component({
    selector:'app-last-matches',
    templateUrl:'./last-matches.component.html',
    styleUrls: ['./last-matches.component.css', '../user-matches-overwiev.component.css']
})

export class LastMatchesComponent {
   @Input() lastMatches!:MatchShortInfo[]
   @Input() heroes!: HeroResponseData;
   constructor(private router:Router){}

  
}