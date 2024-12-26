import { Component,OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private api: ApiHelperService, private tokenStorageService: TokenStorageService,
    private router: Router,
    private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
   const token = this.tokenStorageService.getToken();
   if (token) {
    const user = this.decodeToken(token);
    if (user) {
      this.profileForm.patchValue({
        username: user.username,
      });
    }
  }
}

decodeToken(token: string): any {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error('Error while decoding token', e);
    return null;
  }
}

onSubmit(): void {
  console.log('submit');
  if(this.profileForm.valid) {
    const user = this.tokenStorageService.getUser();
    if(user){
      const { username, password } = this.profileForm.value;
      const token = this.tokenStorageService.getToken();
      const headers = { Authorization: `Bearer ${token}` };
      this.api.put({
        endpoint: `/users/${user.id}`,
        data: { username, password },
        headers: headers,
      }).then(response => {
        console.log(response);
        this.successMessage = 'Vos informations ont été mises à jour avec succès.';
      }).catch((error) => {
        console.error('Error while updating user data', error);
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour de vos informations.';
      });
    }
  }
  }

}


