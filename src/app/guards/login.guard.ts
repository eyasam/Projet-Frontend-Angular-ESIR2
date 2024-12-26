import { CanActivateFn } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenStorageService = inject(TokenStorageService);

  if (tokenStorageService.isLogged()) {
    router.navigateByUrl('/profile');
    return false;
  }
  return true;
};
