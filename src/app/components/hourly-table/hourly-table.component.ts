import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleHourly } from '../../shared/models/weatherData';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { TableData } from '../../shared/models/table-data';
import { OpenWeatherService } from '../../services/open-weather.service';

@Component({
  selector: 'app-hourly-table',
  templateUrl: './hourly-table.component.html',
  styleUrls: ['./hourly-table.component.scss'],
})
export class HourlyTableComponent implements OnInit, OnDestroy {
  public displayedColumns!: string[];
  public dataSource!: MatTableDataSource<TableData>;
  private destroy$ = new Subject();
  public data!: TableData[];
  public schedule: TableData = {};
  private hours: string[] = ['3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '0:00']

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly openWeatherService: OpenWeatherService,
  ) {}

  ngOnInit() {
   this.openWeatherService.hourly$.pipe(
     takeUntil(this.destroy$)
   ).subscribe( (hourly: ScheduleHourly) => {
      if (!!hourly) {
        this.data = [];
        Object.keys(this.schedule).forEach(key => delete this.schedule[key]);
        this.displayedColumns = ['City Name'];
        this.schedule.city = hourly.name;

        hourly.hourly.forEach((day: any) => {
          const time = this.timeFormat(day.dt);

          if (this.hours.includes(time)
            && !this.schedule.hasOwnProperty(time)) {
            this.displayedColumns.push(time);
            this.schedule[time] = day.dew_point;
          }
        });

        this.data.push(this.schedule);
        this.dataSource = new MatTableDataSource<TableData>(this.data);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  timeFormat(value: number) {
    const targetDate = new Date(value * 1000);
    const hours = targetDate.getHours();

    return `${hours}:00`;
  }
}
