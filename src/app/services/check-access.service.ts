import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckAccessService {
  private hasNavigated: boolean = false;

  setNavigated() {
    this.hasNavigated = true;
    const currentUrl = window.location.href; // Captura la URL completa
    sessionStorage.setItem('lastVisited', currentUrl);
    console.log(`Navegación almacenada: ${currentUrl}`); // Verifica el almacenamiento
  }

  resetNavigation() {
    this.hasNavigated = false; // Resetea la navegación
  }

  hasUserNavigated(): boolean {
    return this.hasNavigated || this.isLastVisited();
  }

  private isLastVisited(): boolean {
    const lastVisited = sessionStorage.getItem('lastVisited');
    const currentUrl = window.location.href; // Captura la URL completa
    console.log(`Última ruta: ${lastVisited}, URL actual: ${currentUrl}`); // Verifica la comparación
    return lastVisited === currentUrl; // Compara las URLs completas
  }

  getPreviousUrl(): string | null {
    return sessionStorage.getItem('lastVisited'); // Devuelve la última URL visitada
  }

  setPreviousUrl(url: string) {
    sessionStorage.setItem('lastVisited', url); // Almacena la URL como la anterior
  }
}
