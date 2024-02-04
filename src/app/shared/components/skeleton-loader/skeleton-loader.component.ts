import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:'app-skeleton-loader',
    templateUrl:'./skeleton-loader.component.html',
    styleUrls:['./skeleton-loader.component.css']
})

export class SkeletonLoaderComponent implements OnInit{
@Input() numberOfLines:number=1
linesArray:number[]=[]

ngOnInit(): void {
    // console.log(this.numberOfLines)
for(let i=0; i<this.numberOfLines; i++){
    this.linesArray.push(i)
}

}
}