import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';


import { MatchInfoWithItems } from 'src/app/shared/models/match-short-info.model';
import { HeroResponseData } from 'src/app/shared/services/data-storage.service';
import { ItemFullInfo } from 'src/app/shared/models/items-full-info.model';
import * as fromApp from '../../store/app.reducer';
import * as UserDetailPageActions from '../store/user-detail-page.actions';


@Component({
  selector: 'app-users-all-matches',
  templateUrl: './users-all-matches.component.html',
  styleUrls: [
    './users-all-matches.component.css',
    '../user-matches-overwiev/user-matches-overwiev.component.css',
  ],
})


export class UsersAllMatchesComponent implements OnInit, OnDestroy {
  usersId!: number;
  allMatches!: MatchInfoWithItems[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  itemIds!: { [key: number]: string };
  itemFullInfo!: ItemFullInfo;
  heroes!: HeroResponseData;
  SharedDataSubscription!: Subscription;
  AllMatchesDataSubscription!: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit(): void {
    this.SharedDataSubscription = this.store
      .select('shared')
      .pipe(
        map((sharedState) => {
          return {
            heroes: sharedState.heroes,
            itemIds: sharedState.itemsIds,
            itemFullInfo: sharedState.itemsFullInfo,
          };
        })
      )
      .subscribe((selectedData) => {
        this.heroes = selectedData.heroes;
        this.itemIds = selectedData.itemIds;
        this.itemFullInfo = selectedData.itemFullInfo;
      });
    this.store.dispatch(UserDetailPageActions.FetchAllUserMatches());

    this.AllMatchesDataSubscription = this.store
      .select('usersDetailPage')
      .pipe(
        map((userDetailPageState) => {
          return userDetailPageState.allMatches;
        })
      )
      .subscribe((allMatches) => {
        this.allMatches = allMatches;
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  ngOnDestroy(): void {
    this.AllMatchesDataSubscription.unsubscribe();
    this.SharedDataSubscription.unsubscribe();
  }
}
