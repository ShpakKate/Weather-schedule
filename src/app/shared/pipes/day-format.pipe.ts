import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayFormat'
})
export class DayFormatPipe implements PipeTransform {

  transform(value: unknown) {
    let day;

    if (typeof value === 'number') {
      const targetDate = new Date(value * 1000);
      day = getDayName(targetDate, "en-EN");
    } else return ;

    function getDayName(dateStr: Date, locale: string) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: 'long' });
    }

    return day;
  }

}
