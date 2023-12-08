import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('ability-desc') abilityDesc!: ElementRef;
  bottom!: number;
  abilityInfo!: OneAbilityFullInfo;
  constructor(private elRef: ElementRef) {}
  ngOnInit(): void {
    this.elRef.nativeElement.style.left =
      this.left - this.elRef.nativeElement.getBoundingClientRect().width + 'px';
    this.elRef.nativeElement.style.top =
      this.top + document.documentElement.scrollTop + 'px';
    this.abilityInfo = this.allAbilitiesDesc[this.abilityName];
    this.top = this.elRef.nativeElement.getBoundingClientRect().top;
    this.left = this.elRef.nativeElement.getBoundingClientRect().left;
    this.bottom = this.elRef.nativeElement.getBoundingClientRect().bottom;
    console.log(this.top);
    // console.log(this.left);
    // console.log(this.bottom);
    // console.log(this.elRef.nativeElement.offsetHeight)
    // console.log(this.elRef.nativeElement.getBoundingClientRect());
    console.log(window.innerHeight);
  
  }

  ngAfterViewInit(){
    let elHeigth=this.elRef.nativeElement.offsetHeight
    console.log(this.elRef.nativeElement.offsetHeight)
    // console.log(this.abilityDesc.nativeElement)
    if(elHeigth+this.top> window.innerHeight){
      this.elRef.nativeElement.style.top=this.top + document.documentElement.scrollTop-( elHeigth+this.top-window.innerHeight)+ 'px'
      console.log(this.elRef.nativeElement.style.top)
    }
  }
}
