import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup; 
  msgErreur: string = '';

  constructor(    
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    this.api
      .post({ endpoint: '/auth/login', data: { username, password } })
      .then((response) => {
        this.tokenStorageService.save(response.access_token, username);
        this.tokenStorageService.saveCurrentPassword(password); // Stocker temporairement le mot de passe
        console.log('Mot de passe sauvegardé pendant la connexion :', password);
        if (this.tokenStorageService.isLogged()) {
          this.router.navigateByUrl('/users');
        }
      })
      .catch((error) => {
        this.msgErreur = 'Nom d’utilisateur ou mot de passe incorrect.';
      });
  }
  
  

}
