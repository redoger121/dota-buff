import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../users-service';
import { User } from '../user-model';
import { ProPlayer } from '../pro-players.mode';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private usersService: UsersService,
    private rout: ActivatedRoute
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
    this.findByName = this.rout.snapshot.params['username'];
    this.paramsSubscription = this.rout.params.subscribe((params) => {
      this.usersAreReady = false;
      this.proPlayersAreReady = false;
      this.proPlayersAreFound = false;
      this.findByName = params['username'];
      this.usersService.findUsersByName(this.findByName).subscribe((users) => {
        this.users = users;
        this.usersAreReady = true;
        this.usersAmount=users.length
      });

      this.usersService
        .findProPLayers(this.findByName)
        .subscribe((proPlayers) => {
          this.proPlayers = proPlayers;
          if (this.proPlayers.length > 0) {
            this.proPlayersAreFound = true;
          }
          this.proPlayersAreReady = true;
        });
    });
  }

  goToUserDetailPage(userId: number) {
    this.router.navigate(['/user-datail', userId, 'overview']);
  }
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
