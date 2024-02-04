import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserPlayedWith } from 'src/app/shared/models/user-played-with.model';
import * as fromApp from '../../../../store/app.reducer';
import * as UserDetailPageActions from '../../../store/user-detail-page.actions';
@Component({
  selector: 'tr[app-played-with-item]',
  templateUrl: './played-with-item.component.html',
  styleUrls: ['./played-with-item.component.css'],
})
export class PlayedWithItemComponent implements OnInit {
  @Input() playedWithUser!: UserPlayedWith;
  @Input() userWithMaxGames!: number;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
      console.log(this.userWithMaxGames)
  }
  goToUserPage(accountId: number) {
    this.router.navigate(['user-datail', accountId, 'overview']);
    this.store.dispatch(
      UserDetailPageActions.SetPlayerId({ userId: accountId })
    );
  }
}
