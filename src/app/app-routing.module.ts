import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailPageComponent } from './user-detail-page/user-detail-page.component';
import { UserMatchesOverwievComponent } from './user-detail-page/user-matches-overwiev/user-matches-overwiev.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchOverViewComponent } from './match-detail/match-overview/match-overview.component';
import { ProcessingGameComponent } from './processing-game/processing-game.component';
import { UsersAllMatchesComponent } from './user-detail-page/uses-all-matches/users-all-matches.component';
import { UserMatchesOverviewResolver } from './user-detail-page/user-matches-overwiev/user-matches-verview-resolve.service';
import {
  AllMatchesResolver,
  ItemIdsResolver,
  ItemsFulInfoResolver,
} from './user-detail-page/uses-all-matches/users-all-matches-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: ':username',
        component: UsersListComponent,
        // resolve:[userListsResolver]
      },
    ],
  },
  {
    path: 'matches/:id',
    component: MatchDetailComponent,
    children: [
      {
        path: 'overview',
        component: MatchOverViewComponent,
      },
    ],
  },

  { path: 'match/processing-game', component: ProcessingGameComponent },
  { path: 'processing-game/:id', component: ProcessingGameComponent },

  {
    path: 'user-datail/:id',
    component: UserDetailPageComponent,
    // resolve[],
    children: [
      {
        path: 'overview',
        component: UserMatchesOverwievComponent,
        resolve: [UserMatchesOverviewResolver],
      },
      {
        path: 'all-matches',
        component: UsersAllMatchesComponent,
        resolve: [AllMatchesResolver, ItemIdsResolver, ItemsFulInfoResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
