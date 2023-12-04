import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appToggleNav]',
})
export class ToggleNavDirective implements OnInit, OnDestroy {
  @Input() showNav!: BehaviorSubject<boolean>;
  constructor(private elem: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.showNav.subscribe((isCliked: boolean) => {
      if (isCliked) {
        this.renderer.addClass(this.elem.nativeElement, 'show');
      } else {
        this.renderer.removeClass(this.elem.nativeElement, 'show');
      }
    });
  }
  ngOnDestroy(): void {
    this.showNav.unsubscribe();
  }
}
