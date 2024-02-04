import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { ItemFullInfo, ItemInfo } from '../../models/items-full-info.model';

@Component({
  selector: 'appItemTooltip',
  templateUrl: './item-tool-tip.component.html',
  styleUrls: ['./item-tool-tip.component.css'],
})
export class ItemToolTipComponent implements OnInit, AfterViewInit {
  @Input() itemName!: string;
  @Input() allItems!: ItemFullInfo;
  @Input() top!: number;
  @Input() left!: number;
  isRecipe: boolean = false;
  recipeCost!: number;
  itemDesc!: ItemInfo;
  componentsCost: number = 0;
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
   
    this.elRef.nativeElement.style.left =
      this.left - this.elRef.nativeElement.getBoundingClientRect().width + 'px';
    this.elRef.nativeElement.style.top =
      this.top + document.documentElement.scrollTop + 'px';
    // console.log(this.itemName)
    this.itemDesc = this.allItems[this.itemName];
    // console.log(this.itemDesc)
    // console.log(this.itemDesc)
    if (this.itemDesc.components) {
      this.componentsCost = this.itemDesc.components.reduce((acc, el) => {
        return acc + this.allItems[el].cost;
      }, 0);
    }
    if (this.itemDesc.cost > this.componentsCost && this.itemDesc.components) {
      this.recipeCost = this.itemDesc.cost - this.componentsCost;
      this.isRecipe = true;
    }
  }

  ngAfterViewInit() {
    let elHeigth = this.elRef.nativeElement.offsetHeight;
    // console.log(this.elRef.nativeElement.offsetHeight);
    // console.log(this.abilityDesc.nativeElement)
    if (elHeigth + this.top > window.innerHeight) {
      this.elRef.nativeElement.style.top =
        this.top -10+
        document.documentElement.scrollTop -
        (elHeigth + this.top - window.innerHeight) +
        'px';
      // console.log(this.elRef.nativeElement.style.top);
    }
  }
}
