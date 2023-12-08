import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Hero } from '../../models/heroes.model';

@Component({
  selector: 'app-hero-on-map-tool-tip',
  templateUrl: './hero-on-map-tool-tip.component.html',
  styleUrls: ['./hero-on-map-tool-tip.component.css'],
})
export class HeroOnMapToolTipComponent implements OnInit {
  @Input() top!: number;
  @Input() left!: number;
  @Input() heroLaneRole!: string;
  @Input() hero!: Hero;
  @Input() isRadiant!: boolean;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.elRef.nativeElement.style.left = -87 + 'px';
    this.elRef.nativeElement.style.bottom = 28 + 'px';
    
    console.log(this.top);
    console.log(this.elRef.nativeElement.getBoundingClientRect());
  }
}
