import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
private readonly API_KEY = 'X76WCGGE2MPUUA5P7CCSDDTUQ';
private readonly BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';


  constructor(private http: HttpClient) {}

  getWeatherForecast(city: string): Observable<any> {
    const url = `${this.BASE_URL}/${city}?unitGroup=metric&key=${this.API_KEY}&contentType=json`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        let errorMsg = 'Ocorreu um erro ao buscar a previsão do tempo.';
        if (error.status === 404) {
          errorMsg = 'Cidade não encontrada.';
        } else if (error.status === 401 || error.status === 403) {
          errorMsg = 'Chave de API inválida ou acesso negado.';
        } else if (error.status === 0) {
          errorMsg = 'Não foi possível conectar ao servidor.';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  // Converte de Celsius para Fahrenheit
  celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9 / 5) + 32;
  }

  // Formata a data para o estilo brasileiro
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Retorna um emoji de ícone do tempo
  getWeatherIcon(iconName: string): string {
    const icons: any = {
      'clear-day': '☀️',
      'clear-night': '🌙',
      'rain': '🌧️',
      'snow': '❄️',
      'sleet': '🌨️',
      'wind': '💨',
      'fog': '🌫️',
      'cloudy': '☁️',
      'partly-cloudy-day': '⛅',
      'partly-cloudy-night': '🌙',
      'hail': '🌨️',
      'thunderstorm': '⛈️'
    };

    return icons[iconName] || '🌤️';
  }
}
