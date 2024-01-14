import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user-model';
import { ProPlayer } from './pro-players.mode';

interface FindUser {
  userName: FormControl<string>;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  proPlayers: ProPlayer[] = [];
  usersAreReady = false;
  submitButtonPressed = false;
  findByName!: string;

  findUserForm = new FormGroup<FindUser>({
    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  constructor(private router: Router) {}

  onSubmit() {
    if (this.findUserForm.value.userName) {
      this.router.navigate([this.findUserForm.value.userName]);
    }
  }
}
