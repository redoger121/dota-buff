import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSetColorFullLineWidth]',
})
export class SetColorFullLineWidthDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  killsRowWidth: number = 0;
  deathsRowWidth: number = 0;
  assistsRowWidth: number = 0;

  ngAfterViewInit() {
    this.killsRowWidth = this.elementRef.nativeElement
      .querySelector('.kills')
      .getBoundingClientRect().width;
      
    this.deathsRowWidth =
      this.elementRef.nativeElement.querySelector('.deaths').offsetWidth;

    this.assistsRowWidth =
      this.elementRef.nativeElement.querySelector('.assists').offsetWidth;
const assistsPadding=window.getComputedStyle(this.elementRef.nativeElement.querySelector('.assists'),null).paddingRight
    this.elementRef.nativeElement
      .querySelector('.kills')
      .querySelector('.colorFullRow').style.width =
      this.killsRowWidth + this.deathsRowWidth + this.assistsRowWidth - 5 - parseInt(assistsPadding) +'px';
  }
}
