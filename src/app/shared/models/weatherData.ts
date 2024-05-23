export interface WeatherData {
  name: string;
  lat: number;
  lon: number;
}

export interface LatLon {
  lat: number;
  lon: number;
}

export interface ScheduleHourly {
  name: string;
  hourly: Weather[];
}

export interface ScheduleDaily {
  name: string;
  daily: Weather[];
}

export interface Weather {
  temp: number;
}
