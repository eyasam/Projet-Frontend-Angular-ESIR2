import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  isLogged: boolean =false;

  constructor(private route: Router,
    private service: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.service.isLogged();
  }
  logout(): void {
    console.log('logout');
    this.service.clear(); //supprimer les informations de l'utilisateur
    this.route.navigate(['/login']); //rediriger l'utilisateur vers la page de connexion
    
  }

}
