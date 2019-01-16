import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// libraries
import { ChartsModule } from 'ng2-charts';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { StackedColumnComponent } from './components/stacked-column/stacked-column.component'; // agGrid enterprise
@NgModule({
  declarations: [
    AppComponent,
    StackedColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
