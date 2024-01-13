import { Component, OnInit } from '@angular/core';
import { UserDetailPageServise } from './user-detail-page.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserWinLose } from './user-win-loose-statistic.model';
import { Subscription } from 'rxjs';
import { UserAccountInfo } from './user-account-info.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as UserDetailPageActions from './store/user-detail-page.actions';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css'],
})
export class UserDetailPageComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}
  routSubscription!: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(
        UserDetailPageActions.SetPlayerId({ userId: params['id'] })
      );
      this.store.dispatch(UserDetailPageActions.FetchPlayerAccountInfo());
      this.store.dispatch(UserDetailPageActions.FetchPlayerWinLoseStat());
    });
  }
}
