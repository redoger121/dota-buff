import { Component, OnInit } from '@angular/core';
import { UserDetailPageServise } from '../user-detail-page.service';
import { ActivatedRoute } from '@angular/router';
import { MatchInfoWithItems } from 'src/app/shared/models/match-short-info.model';
import {
  DataStorageService,
  HeroResponseData,
} from 'src/app/shared/services/data-storage.service';
import { ItemFullInfo } from 'src/app/shared/models/items-full-info.model';

@Component({
  selector: 'app-users-all-matches',
  templateUrl: './users-all-matches.component.html',
  styleUrls: ['./users-all-matches.component.css', '../user-matches-overwiev/user-matches-overwiev.component.css'],
})
export class UsersAllMatchesComponent implements OnInit {
  usersId!: number;
  allMatches!: MatchInfoWithItems[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  // tableSizes: number[] = [3, 6, 9, 12];

  get itemIds(): { [key: number]: string } {
    return this.dataStorageService.itemIds;
  }

  get itemFullInfo(): ItemFullInfo {
    return this.dataStorageService.itemFullInfo;
  }
  get heroes(): HeroResponseData {
    return this.dataStorageService.heroes;
  }

  constructor(
    private userDetailPageServise: UserDetailPageServise,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}
  ngOnInit(): void {
    this.usersId = this.route.parent?.snapshot.params['id'];

    this.userDetailPageServise
      .fetchAllUsersMatches(this.usersId)
      .subscribe((response) => {
        console.log(response);
        this.allMatches = response;
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.fetchPosts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.fetchPosts();
  }
}
