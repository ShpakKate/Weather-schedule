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
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { OpenWeatherService } from '../../services/open-weather.service';
import { WeatherData } from '../../shared/models/weatherData';
import { UrlParamsService } from '../../services/url-params.service';
import { ActivatedRoute } from '@angular/router';

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
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      cities: ['', Validators.required],
    });

    this.route.queryParamMap.pipe(
      takeUntil(this.destroy$),
    ).subscribe(param => {
      const city = param.get('city');

      this.form.get('cities')?.setValue(city);
    });

    this.form.get('cities')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((city: string) => {
        this.urlParamsService.resetParams();
        this.urlParamsService.setUrlParams({
          city: city,
        });

        return this.openWeatherService.getCity(city)
      }),
      takeUntil(this.destroy$),
    ).subscribe(
      ([targetCity]: WeatherData[]) => {

        if (!!targetCity) {
          this.onCityChanged.emit(targetCity);
          this.onNotFoundChanged.emit(false);
        } else {
          this.onNotFoundChanged.emit(true);
        }

        this.cdr.detectChanges();
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
