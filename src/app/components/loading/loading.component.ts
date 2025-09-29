import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div *ngIf="isLoading" class="overlay">
      <div class="content">
        <p>{{ message }}</p>
        <p>Carregando...</p>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      text-align: center;
      border: 1px solid black;
      padding: 20px;
    }
  `]
})
export class LoadingComponent {
  @Input() isLoading = false;
  @Input() message = 'Carregando previsão do tempo...';
}
