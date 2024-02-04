import { Component, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { externalTooltipHandler } from './chart-tooltip';
import Annotation from 'chartjs-plugin-annotation';

import {
  DataStorageService,
  HeroResponseData,
} from 'src/app/shared/services/data-storage.service';
import { Player } from 'src/app/shared/models/match-full-info.model';
@Component({
  selector: 'app-match-map',
  templateUrl: './match-map.component.html',
  styleUrls: ['./match-map.component.css'],
})
export class MatchMapComponetn implements OnInit {
  @Input() towerRadiantStatus!: number[];
  @Input() barracksRadiantSratus!: number[];
  @Input() towerDireStatus!: number[];
  @Input() barracksDireSratus!: number[];
  @Input() radiantWin!: boolean;
  @Input() players!: Player[];
  @Input() radiantHardLaneCore!: number;
  @Input() radiantEasyLaneCore!: number;
  @Input() direHardLaneCore!: number;
  @Input() direEasyLaneCore!: number;
  @Input() radiantGoldAvg?: number[];
  @Input() radiantExpAvg?: number[];
  @Input() heroes!:HeroResponseData
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData!: ChartConfiguration['data'];
  public lineChartOptions!: ChartConfiguration['options'];


  constructor() {
    Chart.register(Annotation);
  }

  ngOnInit(): void {


console.log(this.towerRadiantStatus)
console.log(this.towerDireStatus)
console.log(this.barracksRadiantSratus)
console.log(this.barracksDireSratus)

    if (this.radiantGoldAvg && this.radiantExpAvg) {
      let amountOfMinutesInChart: number[] = [];
      this.radiantGoldAvg.forEach((el, index) => {
        amountOfMinutesInChart.push(index);
      });

      this.lineChartData = {
        datasets: [
          {
            data: this.radiantGoldAvg!,
            label: 'Золото',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,0,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          },
          {
            data: this.radiantExpAvg!,
            label: 'Опыт',
            backgroundColor: 'transparent',
            borderColor: 'rgba(100,149,237  ,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)',
            fill: 'origin',
          },
        ],
        labels: amountOfMinutesInChart,
      };

      this.lineChartOptions = {
        scales: {
          // We use this empty structure as a placeholder for dynamic theming.
          y: {
            position: 'left',
            grid: {
              drawOnChartArea: true, // only want the grid lines for one axis to show up
              color: 'grey',
            },
          },
        },
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: { display: true },
          tooltip: {
            enabled: false,
            // position: 'nearest',
            external: externalTooltipHandler,
            // callbacks: {
            //   footer: this.footer,
            // }
          },
          legend: { display: false },
          annotation: {
            annotations: [
              {
                type: 'box',
                drawTime: 'beforeDatasetsDraw',
                yScaleID: 'y',
                yMax: 0,
                backgroundColor: 'rgba(71,0,17,0.2)',
              },
              {
                type: 'box',
                drawTime: 'beforeDatasetsDraw',
                yScaleID: 'y',
                yMin: 0,
                backgroundColor: 'rgba(0,179,0, 0.2)',
              },
            ],
          },
        },
      };
    }
  }

  footer(tooltipItems: any[]) {
    let sum = 0;

    tooltipItems.forEach(function (tooltipItem) {
      sum += tooltipItem.parsed.y;
    });
    return 'Sum: ' + sum;
  }

  public lineChartType: ChartType = 'line';
}
