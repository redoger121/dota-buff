import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appSetElemWidth]',
})
export class SetElemWidthDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  @Input() width!: number;
  @Input() customColors!: string;
  ngOnInit(): void {
if(this.width){
  // console.log(this.width)
  // console.log(this.elementRef.nativeElement)
  this.elementRef.nativeElement.style.width = Math.round(this.width) + '%';

}
    if (this.customColors) {
        this.elementRef.nativeElement.style.backgroundColor =this.customColors

    } else {

      if (this.width <= 100 && this.width > 75) {
        this.elementRef.nativeElement.style.backgroundColor =
          'rgb(102, 187, 106)';
      } else if (this.width <= 75 && this.width > 50) {
        this.elementRef.nativeElement.style.backgroundColor =
          'rgb(206, 221, 87)';
      } else if (this.width <= 50 && this.width > 25) {
        this.elementRef.nativeElement.style.backgroundColor =
          'rgb(206, 221, 87)';
      } else if (this.width <= 25 && this.width >= 1) {
        this.elementRef.nativeElement.style.backgroundColor =
          'rgb(252, 95, 77)';
      }
    }
  }
}
