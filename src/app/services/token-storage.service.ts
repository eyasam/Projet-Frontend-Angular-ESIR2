// import { Injectable } from '@angular/core';


// const TOKEN_KEY = 'token';
// const USERNAME_KEY = 'username';
// const IS_LOGGED_IN = 'isLoggedIn';
// const IS_LOGGED = 'true';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenStorageService {

//   public clear(): void {
//     localStorage.clear();
//   }
//   public save(token: string): void {
//     localStorage.removeItem(TOKEN_KEY);
//     localStorage.removeItem(USERNAME_KEY );
//     localStorage.removeItem(IS_LOGGED_IN);
//     localStorage.setItem(TOKEN_KEY, token);
//     localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
//   }
//   public getToken(): string {
//     const token = localStorage.getItem(TOKEN_KEY);
//     return token === null ? '' : token;
//   }

//   public getUser(): any {
//     const user = localStorage.getItem(USERNAME_KEY);
//     return user ? JSON.parse(user) : null; // Retourne l'utilisateur ou null si non trouvé
//   }

//   public isLogged(): boolean {
//     return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
//   }
// }

import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  public save(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USERNAME_KEY);
      localStorage.removeItem(IS_LOGGED_IN);
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
    }
  }

  public getToken(): string {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem(TOKEN_KEY);
      return token === null ? '' : token;
    }
    return ''; // Retourne une chaîne vide si `localStorage` n'est pas disponible
  }

  public getUser(): any {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem(USERNAME_KEY);
      return user ? JSON.parse(user) : null; // Retourne l'utilisateur ou null si non trouvé
    }
    return null; // Si `localStorage` n'est pas disponible
  }

  public isLogged(): boolean {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(IS_LOGGED_IN) === IS_LOGGED;
    }
    return false; // Considère non connecté si `localStorage` n'est pas disponible
  }
}
