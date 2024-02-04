import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ListItemComponent } from './users/users-list/list-item/list-item.component';
import { LoadingSpinerComponent } from './shared/loading-spinner/loading-spiner.component';
import { UserDetailPageComponent } from './user-detail-page/user-detail-page.component';
import { UserDetailTopInfoComponent } from './user-detail-page/user-detail-top-info/user-detail-top-info.component';
import { UserMatchesOverwievComponent } from './user-detail-page/user-matches-overwiev/user-matches-overwiev.component';
import { SetElemWidthDirective } from './shared/directives/set-width.directive';
import { ColorfullLineComponen } from './shared/components/clorfull-line-in-tables/clorfull-line-in-tables.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { TowerColorDirective } from './shared/directives/tower-color.directive';
import { UnlessDirective } from './shared/directives/while.directive';
import { TooltipDirective } from './shared/directives/tool-tip.directive';
import { ItemToolTipComponent } from './shared/components/item-tool-tip/item-tool-tip.component';
import { AbilityToolTipComponent } from './shared/components/ability-tool-tip/ability-tool-tip.component';
import { MatchMapComponetn } from './match-detail/match-overview/match-map/match-map.component';
import { HeaderComponent } from './header/header.component';
import { ToggleNavDirective } from './shared/directives/togle-header-button';
import { MatchOverViewComponent } from './match-detail/match-overview/match-overview.component';
import { ProcessingGameComponent } from './processing-game/processing-game.component';
import { HeroOnMapToolTipComponent } from './shared/components/hero-on-map-tool-tip/hero-on-map-tool-tip.component';
import { UsersAllMatchesComponent } from './user-detail-page/uses-all-matches/users-all-matches.component';
import { appReducer } from './store/app.reducer';
import { environment } from '../environments/environment';
import { PlayersEffects } from './users/store/users.effects';
import { UsersDetailPageEffects } from './user-detail-page/store/users-detail-page.effects';
import { SharedEffects } from './shared/store/shared.effects';
import { MatchDetailEffects } from './match-detail/store/match-detail.effects';
import { SkeletonLoaderComponent } from './shared/components/skeleton-loader/skeleton-loader.component';
import { LastMatchesComponent } from './user-detail-page/user-matches-overwiev/last-matches/last-matches.component';
import { LastMatchItemComponent } from './user-detail-page/user-matches-overwiev/last-matches/last-match-item/last-match-item';
import { SetColorFullLineWidthDirective } from './shared/directives/matches-table-colorful-line-width.directive';
import { PlayedWithComponent } from './user-detail-page/user-matches-overwiev/played-with/played-with.component';
import { PlayedWithItemComponent } from './user-detail-page/user-matches-overwiev/played-with/played-with-item/played-with-item.component';
import { MostPlayedHeroesComponent } from './user-detail-page/user-matches-overwiev/most-played-heroes/most-played-heroes.component';
import { MostPlayedHeroesItem } from './user-detail-page/user-matches-overwiev/most-played-heroes/most-played-heroes-item/most-played-heroes-item.component';
import { UserAllMatchesItemComponent } from './user-detail-page/uses-all-matches/user-all-matches-item/user-all-matches-item.component';
import { HeroDescriptionToolTopComponent } from './shared/components/hero-description-tool-tip/hero-description-tool-tip.component';
import { MatchDetailTopInfoComponent } from './match-detail/match-detail-top-info/match-detail-top-info.component';
import { MatchInforTableComponent } from './match-detail/match-overview/match-info-table/match-info-table.component';
import { MatchInfoTableItemComponent } from './match-detail/match-overview/match-info-table/match-info-table-item/match-info-table-item';
import { MatchAbilitiesTableComponent } from './match-detail/match-overview/match-abilities-table/match-abilities-table.component';
import { MatchAbilitiesTableItemComponent } from './match-detail/match-overview/match-abilities-table/match-abilities-table-item/match-abilities-table-item.component';
import { UserHeroesStaticticComponent } from './user-detail-page/user-heroes-statistic/user-heroes-statistic';



registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    ListItemComponent,
    LoadingSpinerComponent,
    UserDetailPageComponent,
    UserDetailTopInfoComponent,
    UserMatchesOverwievComponent,
    SetElemWidthDirective,
    ColorfullLineComponen,
    MatchDetailComponent,
    TowerColorDirective,
    UnlessDirective,
    TooltipDirective,
    ItemToolTipComponent,
    AbilityToolTipComponent,
    MatchMapComponetn,
    HeaderComponent,
    ToggleNavDirective,
    MatchOverViewComponent,
    ProcessingGameComponent,
    HeroOnMapToolTipComponent,
    UsersAllMatchesComponent,
    SkeletonLoaderComponent,
    LastMatchesComponent,
    LastMatchItemComponent,
    SetColorFullLineWidthDirective,
    PlayedWithComponent,
    PlayedWithItemComponent,
    MostPlayedHeroesComponent,
    MostPlayedHeroesItem,
    UserAllMatchesItemComponent,
    HeroDescriptionToolTopComponent,
    MatchDetailTopInfoComponent,
    MatchInforTableComponent,
    MatchInfoTableItemComponent,
    MatchAbilitiesTableComponent,
    MatchAbilitiesTableItemComponent,
    UserHeroesStaticticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClipboardModule,
    FormsModule,
    NgChartsModule,
    NgxPaginationModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([
      PlayersEffects,
      UsersDetailPageEffects,
      SharedEffects,
      MatchDetailEffects,
    ]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
