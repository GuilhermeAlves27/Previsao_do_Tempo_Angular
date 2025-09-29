export interface WeatherData {
  resolvedAddress: string;
  days: WeatherDay[];
}

export interface WeatherDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  conditions: string;
  description: string;
  icon: string;
  humidity: number;
  windspeed: number;
}

export interface WeatherResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: WeatherDay[];
}
