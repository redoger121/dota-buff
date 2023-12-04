import { Component, OnInit } from '@angular/core';
import { UserDetailPageServise } from './user-detail-page.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserWinLose } from './user-win-loose-statistic.model';
import { Subscription } from 'rxjs';
import { UserAccountInfo } from './user-account-info.model';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css'],
})
export class UserDetailPageComponent implements OnInit {
  constructor(
    private userDetailService: UserDetailPageServise,
    private route: ActivatedRoute
  ) {}

  userId!: number;

  userAccountInfo!: UserAccountInfo;

 
  ngOnInit(): void {
   
    this.userId = this.route.snapshot.params['id'];
  }
}
