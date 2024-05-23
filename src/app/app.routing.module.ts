import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherScheduleComponent } from './weather-schedule/weather-schedule.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'schedule',
        component: WeatherScheduleComponent,
      },
      {
        path: '**',
        redirectTo: 'schedule',
        pathMatch: 'full',
      }
    ])
  ]
})
export class AppRoutingModule {}
