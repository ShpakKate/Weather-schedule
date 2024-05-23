import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WeatherScheduleComponent } from './weather-schedule/weather-schedule.component';
import { CitiesFilterComponent } from './components/cities-filter/cities-filter.component';
import { DailyTableComponent } from './components/daily-table/daily-table.component';
import { HourlyTableComponent } from './components/hourly-table/hourly-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { DayFormatPipe } from './shared/pipes/day-format.pipe';
import { TemperatureConverterPipe } from './shared/pipes/temperature-converter.pipe';
import { TimeFormatPipe } from './shared/pipes/time-format.pipe';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    WeatherScheduleComponent,
    CitiesFilterComponent,
    DailyTableComponent,
    HourlyTableComponent,
    DayFormatPipe,
    TemperatureConverterPipe,
    TimeFormatPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatCardModule,
    RouterLink,
    RouterOutlet,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
