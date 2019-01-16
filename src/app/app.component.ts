import { Component, OnInit, ViewChild, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

// amCharts import Libreary
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;
  @ViewChild('agGrid') agGrid: AgGridNg2;
  private girdApi;
  private gridColumnApi;
  private sortingOrder;

  title = 'Ag-Grid-Table';

  columnDefs = [
    {
      headerName: 'Athlete',
      field: 'athlete',
      sortable: true,
      filter: true },
    {
      headerName: 'Age',
      field: 'age',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Country',
      field: 'country',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Year',
      field: 'year',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Gold',
      field: 'gold',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Silver',
      field: 'silver',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Bronce',
      field: 'bronce',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Total',
      field: 'total',
      sortable: true,
      filter: true
    }
  ];
/*   columnDefs = [
    {headerName: 'Make', field: 'make', sortable: true, filter: true },
    {headerName: 'Price', field: 'price', sortable: true, filter: true }
  ]; */

  autoGroupColumnDef = {
    headerName: 'Model',
    field: 'model',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
        checkbox: true
    }
  };

  rowData: any;

  constructor( private http: HttpClient, private zone: NgZone ) {

  }

  ngOnInit() {
        // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
        // this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartdiv', am4charts.XYChart3D);

      chart.titles.create().text = 'Temperature Cº';

      chart.data = [{
        'category': 'Device 1',
        'value1': 40,
        'value2': 80
      }];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.strokeOpacity = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.strokeOpacity = 0;
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.labels.template.adapter.add('text', (text: any) => {
      if ((text > 110) || (text < -51)) {
        return '';
      } else {
        return text + 'Cº';
        }
      });

      // Create series
      let series1 = chart.series.push(new am4charts.ConeSeries());
      series1.dataFields.valueY = 'value1';
      series1.dataFields.categoryX = 'category';
      series1.columns.template.width = am4core.percent(80);
      series1.columns.template.fillOpacity = 0.9;
      series1.columns.template.strokeOpacity = 1;
      series1.columns.template.strokeWidth = 2;

      let series2 = chart.series.push(new am4charts.ConeSeries());
      series2.dataFields.valueY = 'value2';
      series2.dataFields.categoryX = 'category';
      series2.stacked = true;
      series2.columns.template.width = am4core.percent(80);
      series2.columns.template.fill = am4core.color('#000');
      series2.columns.template.fillOpacity = 0.1;
      series2.columns.template.stroke = am4core.color('#000');
      series2.columns.template.strokeOpacity = 0.2;
      series2.columns.template.strokeWidth = 2;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onGridReady(params: any) {
    this.girdApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinnersSmall.json')
      .subscribe( (resp: any) => {
        console.log(resp);
        this.rowData = resp;
      });
  }

}
