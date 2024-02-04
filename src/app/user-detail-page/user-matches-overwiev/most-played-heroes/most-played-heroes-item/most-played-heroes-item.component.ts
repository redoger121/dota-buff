import { Component, Input } from '@angular/core';
import { HeroPlayedStatistic } from 'src/app/shared/models/hero-played-statistic.model';


@Component({
  selector: 'tr[app-most-played-heroes-item]',
  templateUrl: './most-played-heroes-item.component.html',
  styleUrls: ['./most-played-heroes-item.component.html'],
})
export class MostPlayedHeroesItem {
  @Input() heroPlayed!: HeroPlayedStatistic;
  @Input() heroMaxPlayed!:number;
}
