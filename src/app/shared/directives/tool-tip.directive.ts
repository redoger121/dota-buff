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

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  @Input() tooltip: string = '';
  @Input() delay? = 0;
  @Input() allItemsDesc?: ItemFullInfo;
  @Input() allAbilitiesDesc?: AbilitiesFullInfo;
  private isClear: boolean = true;
  private timer: any;
  top = 0;
  left = 0;
  createdToolTip!:
    | ComponentRef<ItemToolTipComponent>
    | ComponentRef<AbilityToolTipComponent>;
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
      let popup = this.viewContainerRef.createComponent(ItemToolTipComponent);
      this.createdToolTip = popup;
      this.createdToolTip.instance.itemName = this.tooltip;
      this.createdToolTip.instance.allItems = this.allItemsDesc;
      this.createdToolTip.instance.left = this.left;
      this.createdToolTip.instance.top = this.top;
      this.isClear = false;
    }
    if (this.allAbilitiesDesc) {
      let popup = this.viewContainerRef.createComponent(
        AbilityToolTipComponent
      );
      this.createdToolTip = popup;
      this.createdToolTip.instance.abilityName = this.tooltip;
      this.createdToolTip.instance.allAbilitiesDesc = this.allAbilitiesDesc;
      this.createdToolTip.instance.left = this.left;
      this.createdToolTip.instance.top = this.top;
      this.isClear = false;
    }
  }
}
