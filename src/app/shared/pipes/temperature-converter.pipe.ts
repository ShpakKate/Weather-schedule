import { Pipe, PipeTransform } from '@angular/core';

const KELVIN_CELSIUS_DIFF = 273.15;

@Pipe({
  name: 'temperatureConverter'
})
export class TemperatureConverterPipe implements PipeTransform {

  transform(value: number) {
    if(value && !isNaN(value)){
      const temp = value - KELVIN_CELSIUS_DIFF;
      return temp.toFixed(2);
    }
    return;
  }

}
