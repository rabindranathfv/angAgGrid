import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  constructor( private http: HttpClient ) {

  }

  ngOnInit() {
        // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
        // this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');
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
