import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: unknown) {
    let time;

    if (typeof value === 'number') {
      const targetDate = new Date(value * 1000);
      const hours = targetDate.getHours();
      const minutes = targetDate.getMinutes();
      time = `${hours}:${minutes}`;
    } else return ;

    return time;
  }

}
