import { Injectable } from '@angular/core';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private currentPassword: string | null = null; // Stockage temporaire

  public clear(): void {
    localStorage.clear();
    this.currentPassword = null; 
  }

  public save(token: string, username: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
  }

  public saveCurrentPassword(password: string): void {
    this.currentPassword = password;
    console.log('Mot de passe actuel sauvegardé :', this.currentPassword);

  }

  public validateOldPassword(inputPassword: string): boolean {
    console.log('Mot de passe actuel attendu :', this.currentPassword);
    console.log('Mot de passe saisi par l’utilisateur :', inputPassword);
    return this.currentPassword === inputPassword;
  }
  

  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }

  public getUser(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT :', error);
      return null;
    }
  }

  public isLogged(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(IS_LOGGED_IN) === IS_LOGGED;
    }
    return false;
  }

  public hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}
