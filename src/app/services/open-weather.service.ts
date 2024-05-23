import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LatLon, ScheduleDaily, ScheduleHourly, WeatherData } from '../shared/models/weatherData';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private key = '010721642521f31b0fbc8c3831d45951';
  public daily: Subject<ScheduleDaily> = new Subject();
  public daily$ : Observable<ScheduleDaily> = this.daily.asObservable();
  public hourly: Subject<ScheduleHourly> = new Subject();
  public hourly$: Observable<ScheduleHourly> = this.hourly.asObservable();

  constructor(
    private readonly http: HttpClient,
  ) {}

  getCity(city: string): Observable<WeatherData[]> {
    return this.http
      .get<WeatherData[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.key}`)
  }

  getHourlyWeatherSchedule(latLon: LatLon): Observable<ScheduleHourly> {
    return this.http
      .get<ScheduleHourly>(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&exclude=current,daily,minutely,alerts&appid=${this.key}`)
  }
  getDailyWeatherSchedule(latLon: LatLon): Observable<ScheduleDaily> {
    return this.http
      .get<ScheduleDaily>(`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&exclude=minutely,hourly,alerts&appid=${this.key}`)
  }
}
