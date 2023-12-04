import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTowerColor]',
})
export class TowerColorDirective implements OnInit {
  @Input() colorCode!: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.colorCode === 0) {
      this.elementRef.nativeElement.style.filter =
        'grayscale(100%) brightness(70%)';
    } else {
      this.elementRef.nativeElement.style.filter = 'contrast(150%)';
    }
  }
}
