import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appToggleNav]',
})
export class ToggleNavDirective implements OnInit, OnDestroy {
  @ViewChild('mobile-menu') mobileMenu!: ElementRef;
  @Input() showNav!: BehaviorSubject<boolean>;
  isCliked!: boolean;
  constructor(private elem: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.showNav.subscribe((isCliked: boolean) => {
      this.isCliked = isCliked;
    });
  }
  @HostListener('document:click', ['$event']) myClick(event: Event) {
    if (this.isCliked && this.elem.nativeElement.contains(event.target)) {

      this.renderer.setStyle(this.elem.nativeElement.children[1], 'width', 'auto');
    
    } else if (
      this.isCliked &&
      !this.elem.nativeElement.contains(event.target)
    ) {
 
      this.renderer.setStyle(this.elem.nativeElement.children[1], 'width', '0');
   
    
    } else if (!this.isCliked) {
      this.renderer.setStyle(this.elem.nativeElement.children[1], 'width', '0');
   
 
    }
  }

  ngOnDestroy(): void {
    this.showNav.unsubscribe();
  }
}
