import { Component,   OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup;

  constructor( private api: ApiHelperService, private tokenStorageService: TokenStorageService,
    private router: Router,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });}

    ngOnInit(): void {}

    onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.api.post({
        endpoint: '/auth/login',
        data: { username, password },
      }).then(response => {
        if (response.access_token) {
          this.tokenStorageService.save(response.access_token);
          if (this.tokenStorageService.isLogged()) {
            this.router.navigateByUrl('/dashboard'); // Redirection après connexion réussie
          }
        }
      }).catch(() => {
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    });
  }
}

  // login(): void {
  //   console.log('login');
  //   const username: string = (document.getElementById('username') as HTMLInputElement).value;
  //   const password: string = (document.getElementById('password') as HTMLInputElement).value;

  //   // this.api.post({endpoint: '/auth/login', data: {username, password}})
  //   // .then((response) => this.tokenStorageService.save(response.access_token));
    
  //   this.api.post({
  //     endpoint: '/auth/login',
  //     data: { username, password },
  //   })
  //   .then(response => {
  //     if (response.access_token) {
  //       this.tokenStorageService.save(response.access_token);
  //       if (this.tokenStorageService.isLogged()) {
  //         this.router.navigateByUrl('/users'); // Redirection après connexion réussie
  //       }
  //     }
  //   })
  //   .catch(() => {
  //     this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
  //   });
    
  //   console.log('username: ' + username + ' password: ' + password);
  // }

}
