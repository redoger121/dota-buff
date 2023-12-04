import { Component, Input } from "@angular/core";

@Component({
    selector:'app-match-map',
    templateUrl:'./match-map.component.html',
    styleUrls:['./match-map.component.css']
})

export class MatchMapComponetn{

@Input() towerRadiantStatus!:number[]
@Input() barracksRadiantSratus!:number[]
@Input() towerDireStatus!:number[]
@Input() barracksDireSratus!:number[]
@Input() radiantWin!:boolean
}