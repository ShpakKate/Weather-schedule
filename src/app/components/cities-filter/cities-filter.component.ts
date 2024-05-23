import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { OpenWeatherService } from '../../services/open-weather.service';
import { WeatherData } from '../../shared/models/weatherData';
import { UrlParamsService } from '../../services/url-params.service';

@Component({
  selector: 'app-cities-filter',
  templateUrl: './cities-filter.component.html',
  styleUrls: ['./cities-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesFilterComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  private destroy$ = new Subject();

  @Output() onCityChanged = new EventEmitter<WeatherData>();
  @Output() onNotFoundChanged = new EventEmitter<boolean>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly openWeatherService: OpenWeatherService,
    private readonly cdr: ChangeDetectorRef,
    private readonly urlParamsService: UrlParamsService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      cities: ['', Validators.required],
    });

    this.urlParamsService.resetParams();

    this.form.get('cities')?.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe( city => {
       if (city) {
         city.trim();

         this.urlParamsService.resetParams();
         this.urlParamsService.setUrlParams({
           city: city,
         });

         this.openWeatherService.getCity(city).pipe(
           takeUntil(this.destroy$)
         ).subscribe( (targetCity: WeatherData[]) => {
           if (targetCity.length > 0) {
             this.onCityChanged.emit(targetCity[0]);
             this.onNotFoundChanged.emit(false);
           } else {
             this.onNotFoundChanged.emit(true);
           }
         });

         this.cdr.detectChanges();
       } else {
         this.urlParamsService.resetParams();
       }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
