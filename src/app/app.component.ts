import { Component, OnInit, ViewChild, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

// amCharts import Libreary
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: 'name' + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';

      series.tooltipText = '{valueY.value}';
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

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
