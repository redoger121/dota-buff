import { DOCUMENT } from '@angular/common';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { ItemToolTipComponent } from '../components/item-tool-tip/item-tool-tip.component';
import { ItemFullInfo } from '../models/items-full-info.model';
import { AbilitiesFullInfo } from '../models/abilities.model';
import { AbilityToolTipComponent } from '../components/ability-tool-tip/ability-tool-tip.component';
import { Hero } from '../models/heroes.model';
import { HeroOnMapToolTipComponent } from '../components/hero-on-map-tool-tip/hero-on-map-tool-tip.component';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltip: string = '';
  @Input() delay? = 0;
  @Input() allItemsDesc?: ItemFullInfo;
  @Input() allAbilitiesDesc?: AbilitiesFullInfo;
  @Input() heroOnMAp?: Hero;
  @Input() isRadiant: boolean=false;
  private isClear: boolean = true;
  private timer: any;
  top = 0;
  left = 0;
  createdToolTip!:
    | ComponentRef<ItemToolTipComponent>
    | ComponentRef<AbilityToolTipComponent>
    | ComponentRef<HeroOnMapToolTipComponent>;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private elemRef: ElementRef
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isClear) {
      return;
    }

    this.top = this.elemRef.nativeElement.getBoundingClientRect().top;
    this.left = this.elemRef.nativeElement.getBoundingClientRect().left;

    if (this.isClear) {
      this.timer = setTimeout(() => {
        this.createTooltipPopup();
      }, this.delay);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    this.isClear = true;

    this.viewContainerRef.clear();
  }

  private createTooltipPopup() {
    if (this.allItemsDesc) {
      console.log(this.left, this.top);
      let popup = this.viewContainerRef.createComponent(ItemToolTipComponent);
      this.createdToolTip = popup;
      popup.instance.itemName = this.tooltip;
      popup.instance.allItems = this.allItemsDesc;
      popup.instance.left = this.left;
      popup.instance.top = this.top;
      this.isClear = false;

    }
    if (this.allAbilitiesDesc) {
      let popup = this.viewContainerRef.createComponent(
        AbilityToolTipComponent
      );
      this.createdToolTip = popup;
      popup.instance.abilityName = this.tooltip;
      popup.instance.allAbilitiesDesc = this.allAbilitiesDesc;
      popup.instance.left = this.left;
      popup.instance.top = this.top;
      console.log(popup)
      this.isClear = false;
    }
    if (this.heroOnMAp) {
      let popup = this.viewContainerRef.createComponent(
        HeroOnMapToolTipComponent
      );
      popup.instance.left = this.left;
      popup.instance.top = this.top;
      popup.instance.heroLaneRole = this.tooltip;
      popup.instance.hero = this.heroOnMAp;
      popup.instance.isRadiant=this.isRadiant
      this.isClear = false;
    }
  }
}
