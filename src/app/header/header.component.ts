import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../users/user-model';
import { ProPlayer } from '../users/pro-players.mode';
import { Router } from '@angular/router';
interface FindUser {
  userName: FormControl<string>;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isCliked = false;

  users: User[] = [];
  proPlayers: ProPlayer[] = [];
  usersAreReady = false;
  submitButtonPressed = false;
  findByName!: string;
  showNav: BehaviorSubject<boolean> = new BehaviorSubject(this.isCliked);
  @ViewChild('hamburger') hamburger!: ElementRef;
  
  constructor(private router: Router) {}

  findUserForm = new FormGroup<FindUser>({
    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  @HostListener('document:click', ['$event']) myClick(event: Event) {
    if (this.isCliked && !this.hamburger.nativeElement.contains(event.target)) {
      this.isCliked = !this.isCliked;
      this.showNav.next(this.isCliked);
    }
  }
  onSubmit() {
    if (this.findUserForm.value.userName) {
      this.router.navigate([this.findUserForm.value.userName]);
    }
  }

  onMenuButtonClick() {
    this.isCliked = !this.isCliked;
    this.showNav.next(this.isCliked);
  }
}
