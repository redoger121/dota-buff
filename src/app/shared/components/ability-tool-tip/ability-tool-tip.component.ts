import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AbilitiesFullInfo, OneAbilityFullInfo } from '../../models/abilities.model';

@Component({
  selector: 'appAbilityTooltip',
  templateUrl: './ability-tool-tip.component.html',
  styleUrls: ['./ability-tool-tip.component.css'],
})
export class AbilityToolTipComponent implements OnInit{
  @Input() abilityName!: string;
  @Input() allAbilitiesDesc!: AbilitiesFullInfo;
  @Input() top!:number
  @Input() left!:number
  abilityInfo!:OneAbilityFullInfo;
  constructor(private elRef:ElementRef){
  }
  ngOnInit(): void {
    
    this.elRef.nativeElement.style.left =
    this.left - this.elRef.nativeElement.getBoundingClientRect().width + 'px';
  this.elRef.nativeElement.style.top = this.top +document.documentElement.scrollTop + 'px';
    this.abilityInfo=this.allAbilitiesDesc[this.abilityName]

  }
}
