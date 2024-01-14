import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../user-model';
import { ProPlayer } from '../pro-players.mode';
import * as fromApp from '../../store/app.reducer';
import * as PlayersAction from '../store/users.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,

    private rout: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  users!: User[];
  proPlayers!: ProPlayer[];
  usersAmount!: number;
  findByName!: string;
  usersAreReady = false;
  proPlayersAreReady = false;
  proPlayersAreFound = false;
  paramsSubscription!: Subscription;

  ngOnInit(): void {
    this.paramsSubscription = this.rout.params
      .pipe(
        tap((params) => {
          this.findByName = params['username'];
          this.store.dispatch(
            PlayersAction.SetPlayersSearchBar({ searchBar: this.findByName })
          );
        }),
        switchMap(() => {
          return this.store.select('players');
        })
      )
      .subscribe((usersState) => {
        console.log(usersState);
        this.users = usersState.users;
        this.usersAreReady = usersState.playersAreReady;
        this.usersAmount = usersState.users.length;
        this.proPlayers = usersState.proPlayers;
        this.proPlayersAreReady = usersState.proPlayersAreReady;
        if (this.proPlayers.length > 0) {
          this.proPlayersAreFound = true;
        } else {
          this.proPlayersAreFound = false;
        }
      });
  }

  goToUserDetailPage(userId: number) {
    this.router.navigate(['/user-datail', userId, 'overview']);
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
