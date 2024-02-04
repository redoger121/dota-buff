import { Component, Input } from "@angular/core";
import { HeroPlayedStatistic } from "src/app/shared/models/hero-played-statistic.model";


@Component({
    selector:'app-most-played-heroes',
    templateUrl:'./most-played-heroes.component.html',
    styleUrls: ['./most-played-heroes.component.css']
})

export class MostPlayedHeroesComponent{
    @Input() heroesPlayedStatistic!:HeroPlayedStatistic[]
    @Input() heroMaxPlayed!:number
}