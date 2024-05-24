import { Component, OnDestroy } from '@angular/core';
import { ScheduleDaily, ScheduleHourly, WeatherData } from '../shared/models/weatherData';
import { OpenWeatherService } from '../services/open-weather.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlParamsService } from '../services/url-params.service';

@Component({
  selector: 'app-weather-schedule',
  templateUrl: './weather-schedule.component.html',
  styleUrls: ['./weather-schedule.component.scss'],
})
export class WeatherScheduleComponent implements OnDestroy{
  private destroy$ = new Subject();
  public weatherHourly!: ScheduleHourly;
  public weatherDaily!: ScheduleDaily;
  private type: string = 'daily';
  public isCityNotFound!: boolean;
  public isCity = true;

  constructor(
    private readonly openWeatherService: OpenWeatherService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly urlParamsService: UrlParamsService,
  ) {}

  getNewCity(city: WeatherData) {
    if (!city) {
      return;
    }

    this.isCity = !city;
    this.urlParamsService.setUrlParams({
      slug: this.type,
    })

    if (city.name !== localStorage.getItem('city')) {
      localStorage.setItem('city', city.name);

      this.openWeatherService.getDailyWeatherSchedule({ lat: city.lat, lon: city.lon }).pipe(
        takeUntil(this.destroy$)
      ).subscribe( (data: ScheduleDaily) => {
        this.weatherDaily = ({
          name: city.name,
          daily: data.daily,
        });

        this.openWeatherService.daily.next(this.weatherDaily);
      });

      this.openWeatherService.getHourlyWeatherSchedule({ lat: city.lat, lon: city.lon }).pipe(
        takeUntil(this.destroy$)
      ).subscribe( (data: ScheduleHourly) => {
        this.weatherHourly = ({
          name: city.name,
          hourly: data.hourly,
        });

        this.openWeatherService.hourly.next(this.weatherHourly);
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  getTypeValue(type: string) {
    this.type = type;

    this.urlParamsService.setUrlParams({
      slug: type,
    })
  }

  isHourly() {
    return this.type === 'hourly';
  }

  isDaily() {
    return this.type === 'daily';
  }

  changeNotFoundMessage(value: boolean) {
    this.isCityNotFound = value;
  }
}
