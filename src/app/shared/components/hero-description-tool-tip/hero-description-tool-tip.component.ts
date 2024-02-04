import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { Hero } from '../../models/heroes.model';


@Component({
  selector: 'app-hero-description-tool-tip',
  templateUrl: './hero-description-tool-tip.component.html',
  styleUrls: ['./hero-description-tool-tip.component.css'],
})
export class HeroDescriptionToolTopComponent implements OnInit, AfterViewInit {
  @Input() heroe!: Hero;
  @Input() top!: number;
  @Input() left!: number;
  @Input() width!:number;
  @Input() parentHeight!: number;
  armor!: number;
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
  
    this.elRef.nativeElement.style.left =
      this.left +this.width + 'px';
    this.elRef.nativeElement.style.top = this.top +  document.documentElement.scrollTop + 'px';
    this.armor = +(this.heroe.base_armor + this.heroe.base_agi * 0.16).toFixed( 2);
  }

  ngAfterViewInit() {
    let elHeigth = this.elRef.nativeElement.offsetHeight;

    if (elHeigth + this.top > window.innerHeight) {
      this.elRef.nativeElement.style.top =
      this.top +
      document.documentElement.scrollTop -
      (elHeigth + this.top - window.innerHeight) +
      'px';
    }
  }
}
