import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-detail-top-info',
  templateUrl: './match-detail-top-info.component.html',
  styleUrls: ['./match-detail-top-info.component.css'],
})
export class MatchDetailTopInfoComponent {
  @Input() matchId!: number;
  @Input() version: number | null = 1;
  @Input() matchRegion!: string;
  @Input() matchEnded!: string;
  @Input() gameMode!: string;
  @Input() matchDuration!: string;
  @Input()radiantWin!: boolean;
  @Input()radiantScore!: number;
  @Input() direScore!: number;
  constructor(private router: Router) {}

  onProcessingGame(): void {
    this.router.navigate(['processing-game', this.matchId]);
  }
}
