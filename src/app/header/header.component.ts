import { Component} from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isCliked = false;
  showNav: BehaviorSubject<boolean> = new BehaviorSubject(this.isCliked);
  onMenuButtonClick() {
    this.isCliked = !this.isCliked;
    this.showNav.next(this.isCliked);
  }
}
