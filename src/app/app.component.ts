import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web Previsão do Tempo';
  cityName = '';
  weatherData: WeatherData | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(private weatherService: WeatherService) {}

  // Função que busca o clima da cidade informada
  searchWeather(): void {
    // Se não digitou nada, mostra mensagem de erro
    if (this.cityName.trim() === '') {
      this.errorMessage = 'Por favor, digite o nome de uma cidade.';
      return;
    }

    // Começa o loading e limpa erros e resultados anteriores
    this.isLoading = true;
    this.errorMessage = '';
    this.weatherData = null;

    // Faz a chamada do serviço para buscar o clima
    this.weatherService.getWeatherForecast(this.cityName).subscribe(
      (data) => {
        this.weatherData = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
        this.weatherData = null;
      }
    );
  }

  // Executa busca ao apertar Enter no input
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchWeather();
    }
  }

  // Limpa a busca e resultados
  clearSearch(): void {
    this.cityName = '';
    this.weatherData = null;
    this.errorMessage = '';
  }

  // Formata a data para exibir para o usuário
  formatDate(dateString: string): string {
    return this.weatherService.formatDate(dateString);
  }

  // Retorna o emoji do clima conforme o nome do ícone
  getWeatherIcon(iconName: string): string {
    return this.weatherService.getWeatherIcon(iconName);
  }

  // Define cor para temperatura (mais quente = vermelho, mais frio = azul)
  getTemperatureColor(temp: number): string {
    if (temp >= 30) {
      return '#ff4444'; 
    }
    if (temp >= 25) {
      return '#ff8800'; 
    }
    if (temp >= 20) {
      return '#ffaa00'; 
    }
    if (temp >= 15) {
      return '#00aa00'; 
    }
    if (temp >= 10) {
      return '#0088aa'; 
    }
    return '#0044aa'; 
  }

  // Retorna "Hoje", "Amanhã" ou o dia da semana para o forecast
  getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } 
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } 

    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  }

  // Função chamada quando usuário clica para tentar novamente após erro
  onRetry(): void {
    this.searchWeather();
  }

  // Função chamada quando usuário clica para limpar mensagem de erro
  onClear(): void {
    this.clearSearch();
  }
}
