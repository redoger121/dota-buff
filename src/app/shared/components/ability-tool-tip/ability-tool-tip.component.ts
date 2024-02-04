import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbilitiesFullInfo,
  OneAbilityFullInfo,
} from '../../models/abilities.model';

@Component({
  selector: 'appAbilityTooltip',
  templateUrl: './ability-tool-tip.component.html',
  styleUrls: ['./ability-tool-tip.component.css'],
})
export class AbilityToolTipComponent implements OnInit, AfterViewInit {
  @Input() abilityName!: string;
  @Input() allAbilitiesDesc!: AbilitiesFullInfo;
  @Input() top!: number;
  @Input() left!: number;
  @Input() width!: number;

  bottom!: number;
  abilityInfo!: OneAbilityFullInfo;
  constructor(private elRef: ElementRef) {}
  ngOnInit(): void {
    this.elRef.nativeElement.style.left = this.left + this.width + 'px';
    this.elRef.nativeElement.style.top =
      this.top + document.documentElement.scrollTop + 'px';
    this.abilityInfo = this.allAbilitiesDesc[this.abilityName];
  }

  ngAfterViewInit() {
    let elHeigth = this.elRef.nativeElement.offsetHeight;
    let elWidth = this.elRef.nativeElement.offsetWidth;
    let elLeft = this.elRef.nativeElement.getBoundingClientRect().left;

    if (elHeigth + this.top > window.innerHeight) {
      this.elRef.nativeElement.style.top =
        this.top +
        document.documentElement.scrollTop -
        (elHeigth + this.top - window.innerHeight) +
        'px';
    }
    if (elLeft + elWidth > window.innerWidth) {
      this.elRef.nativeElement.style.left = this.left - elWidth + 'px';
    }
  }
}
