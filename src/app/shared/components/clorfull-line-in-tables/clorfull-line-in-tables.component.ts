import { Component, Input } from "@angular/core";

@Component({
    selector:'app-colorfull-line',
    styleUrls:['./clorfull-line-in-tables.component.css'],
    template: '<div class="sc-bxivhb fedXRh"> <div appSetElemWidth [width]="width" style=" background-color: rgb(117, 197, 98);"></div></div>'
})

export class ColorfullLineComponen{

    @Input() width!:number
}