import { Component, OnInit } from '@angular/core';

// amCharts import Libreary


@Component({
  selector: 'app-stacked-column',
  templateUrl: './stacked-column.component.html',
  styleUrls: ['./stacked-column.component.scss']
})
export class StackedColumnComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaleStartValue: 0,
  };
  // public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: string[] = ['Device 1','Device 2'];
  public barChartType = 'bar';
  public barChartLegend = true;

  /* public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ]; */
  // the firts parte of data is the input value for the diagram which matches with BarCharLabels position
  public barChartData: any[] = [
    {data: [50, 25], label: 'Temperature'}
  ];

  constructor( ) { }

  ngOnInit() {
  }


  // events
  public chartClicked(event: any): void {
    console.log(event);
  }

  public chartHovered(event: any): void {
    console.log(event);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [];
    for (let index = -40; index < 100; index += 10) {
      data.push(Math.ceil(Math.random() * 100));
    }
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    console.log(clone);
    console.log(data);
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
