import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';


import * as fromApp from '../store/app.reducer';
import * as UserDetailPageActions from './store/user-detail-page.actions';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css'],
})


export class UserDetailPageComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}
  routSubscription!: Subscription;

  ngOnInit(): void {
    this.routSubscription = this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        })
      )
      .subscribe((id) => {
        this.store.dispatch(UserDetailPageActions.SetPlayerId({ userId: id }));
        this.store.dispatch(UserDetailPageActions.FetchAllUserMatches());
      });
  }

  ngOnDestroy(): void {
    this.routSubscription.unsubscribe();
  }
}
