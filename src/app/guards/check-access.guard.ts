import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CheckAccessService } from '../services/check-access.service';

export const CheckAccessGuard = () => {
  const router = inject(Router);
  const accessService = inject(CheckAccessService);

  const currentUrl = window.location.href; // URL completa
  const previousUrl = accessService.getPreviousUrl();

  const allowedRoutes = ['/seats', '/checkout', '/user-data', '/selection'];

  // Verificar si se puede navegar hacia adelante
  const canNavigateForward = allowedRoutes.includes(router.url);
  const hasNavigated = accessService.hasUserNavigated();
  const isHistoryState = window.history.state !== null;

  // Comprobar si se accede a una URL anterior o a la actual
  const isAccessingPreviousOrCurrentUrl = previousUrl &&
    (currentUrl === previousUrl || currentUrl.includes(previousUrl));

  // Si se accede a una página anterior, reiniciar la navegación
  if (isAccessingPreviousOrCurrentUrl) {
    accessService.resetNavigation(); // Resetea la navegación
  }

  // Permitir acceso si:
  // 1. El usuario ha navegado anteriormente
  // 2. La URL actual es una de las permitidas
  // 3. La URL anterior es válida
  // 4. Acceso a una URL anterior o la actual
  if (hasNavigated || canNavigateForward || isHistoryState || 
      isAccessingPreviousOrCurrentUrl) {
    accessService.setPreviousUrl(currentUrl); // Almacena la URL actual
    accessService.setNavigated(); // Marca que el usuario ha navegado
    return true; // Permitir acceso
  }

  // En caso contrario, redirigir a access-denied
  router.navigate(['/access-denied']);
  return false;
};
