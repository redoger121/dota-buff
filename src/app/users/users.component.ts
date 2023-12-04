import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user-model';
import { ProPlayer } from './pro-players.mode';
import { Router } from '@angular/router';

interface FindUser {
  userName: FormControl<string>;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.findUserForm.value.userName) {
      this.router.navigate([this.findUserForm.value.userName]);
    }
  }
}
