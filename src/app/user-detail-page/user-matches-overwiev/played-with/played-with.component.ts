import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserPlayedWith } from 'src/app/shared/models/user-played-with.model';


@Component({
  selector: 'app-played-with',
  templateUrl: './played-with.component.html',
  styleUrls: ['./played-with.component.css'],
})
export class PlayedWithComponent {
  @Input() playedWith!: UserPlayedWith[];
  @Input() userWithMaxGames!: number;



 
}
