import { Component, Input } from '@angular/core';
import { User } from '../../user-model';
import { Router } from '@angular/router';
import { ProPlayer } from '../../pro-players.mode';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input('user') element!: User;
  // @Input('proPlayers') proPlayers!:ProPlayer[];
  constructor(private route: Router) {}

  goToUserDetailPage(userId: number) {
    this.route.navigate(['/user-datail', userId, 'overview']);
  }
}
