import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduleDaily } from '../../shared/models/weatherData';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../../shared/models/table-data';
import { OpenWeatherService } from '../../services/open-weather.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-daily-table',
  templateUrl: './daily-table.component.html',
  styleUrls: ['./daily-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['City Name'];
  public dataSource!: MatTableDataSource<TableData>;
  private destroy$ = new Subject();
  private date!: Date;
  public schedule: TableData = {};
  public data!: TableData[];

  constructor(
    private readonly openWeatherService: OpenWeatherService,
  ) {}

  ngOnInit() {
    this.openWeatherService.daily$.pipe(
      takeUntil(this.destroy$)
    ).subscribe( (daily: ScheduleDaily) => {
      if (!!daily) {
        this.data = [];
        this.schedule.city = daily.name

        daily.daily.forEach( (day: any) => {
          let weeksDay = this.dayFormat(day.dt);

          if (this.displayedColumns.length < 8) {
            this.displayedColumns.push(weeksDay);
          }

          this.schedule[weeksDay] = day.dew_point;
        })

        this.data.push(this.schedule);
        this.dataSource = new MatTableDataSource<TableData>(this.data);
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  dayFormat(value: number) {
    let targetDate = new Date(value * 1000);
    return this.getDayName(targetDate.toString(), "en-EN");
  }

  getDayName(dateStr: string, locale: string) {
    this.date = new Date(dateStr);
    return this.date.toLocaleDateString(locale, { weekday: 'long' });
  }
}


