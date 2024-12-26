import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const service = inject(TokenStorageService);

  if (service.isLogged()) {
    console.log('User is logged in');
    return true;
  }
  else {
  console.log('User is logged in');
  router.navigateByUrl('/login');
  return false;
  }
};
