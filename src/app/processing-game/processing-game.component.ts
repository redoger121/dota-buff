import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchesDetailService } from '../match-detail/matches-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-processing-game',
  templateUrl: './processing-game.component.html',
  styleUrls: ['./processing-game.component.css'],
})
export class ProcessingGameComponent implements OnInit {
  constructor(
    private matchesDetailService: MatchesDetailService,
    private rout: ActivatedRoute,
    private router: Router
  ) {}

  contentLenght: boolean = false;
  matchId!: number;
  isReadOnly = false;
  @ViewChild('f') signupForm!: NgForm;
  ngOnInit(): void {
    if (this.rout.snapshot.params['id']) {
      this.matchId = this.rout.snapshot.params['id'];
      this.processingMatch(this.matchId);
    }
  }
  onSubmit(): void {
    this.matchId = this.signupForm.value.matchId;
    this.processingMatch(this.matchId);
  }

  processingMatch(matchId: number): void {
    this.isReadOnly = true;
    this.matchesDetailService
      .postMachIdtoProcessing(matchId)
      .subscribe((response) => {
        let refreshIntervalId = setInterval(() => {
          this.matchesDetailService
            .getMatchProcessingState(matchId)
            .subscribe((response) => {
              if (response.headers.get('content-length')) {
                this.contentLenght = true;
                console.log(response.headers.get('content-length'));
                clearInterval(refreshIntervalId);
                this.router.navigate(['matches', matchId, 'overview']);
              }
            });
        }, 5000);
      });
  }
}
