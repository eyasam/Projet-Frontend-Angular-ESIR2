import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiHelperService } from '../services/api-helper.service';


@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileForm!: FormGroup;

  errorMssg: string = '';
  successMssg: string = '';
  userId: number | undefined;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private api: ApiHelperService
  ) {
    this.profileForm = this.fb.group(
      {
        oldPass: ['', [Validators.required]],
        newPass: ['', [Validators.required, Validators.minLength(6)]],
        confirmPass: ['', [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }
  

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser(); 
    const token = this.tokenStorageService.getToken(); 

    if (user && token) {
      this.user = user;
      this.userId = user.username;
      console.log('Utilisateur connecté, ID:', this.userId);
    } else {
      this.errorMssg = 'Aucun utilisateur ou jeton trouvé';
      this.hideMessageAfterDelay();
    }
  }

  get formControls() {
    return this.profileForm.controls;
  }

  passwordsMatch(): boolean {
    const newPass = this.profileForm.get('newPass')?.value;
    const confirmPass = this.profileForm.get('confirmPass')?.value;
    return newPass === confirmPass;
  }

  updateProfile(): void {
    const oldPassword = this.profileForm.get('oldPass')?.value;
    const newPassword = this.profileForm.get('newPass')?.value;
    
    if (!this.tokenStorageService.validateOldPassword(oldPassword)) {
      this.errorMssg = 'L’ancien mot de passe est incorrect.';
      this.hideMessageAfterDelay();
      return;
    }
  
    if (!this.userId) {
      this.errorMssg = 'Erreur : utilisateur non connecté.';
      this.hideMessageAfterDelay();
      return;
    }
  
    const updatePayload = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      age: this.user.age,
      password: newPassword, 
    };
  
    console.log('Payload de mise à jour :', updatePayload);
  
    const endpoint = `/users/${this.userId}`;
  
    this.api
      .put({ endpoint, data: updatePayload })
      .then(() => {
        this.successMssg = 'Votre mot de passe a été mis à jour avec succès.';
        this.tokenStorageService.saveCurrentPassword(newPassword); 
        console.log('Nouveau mot de passe sauvegardé :', newPassword);
        this.hideMessageAfterDelay();
        this.profileForm.reset();
      })
      .catch((error: any) => {
        this.errorMssg = 'Erreur lors de la mise à jour du profil : ' + error.message;
        this.hideMessageAfterDelay();
      });
  }
  
  passwordsMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPass = group.get('newPass')?.value;
    const confirmPass = group.get('confirmPass')?.value;
    return newPass === confirmPass ? null : { passwordsMismatch: true };
  }
  
  hideMessageAfterDelay(): void {
    setTimeout(() => {
      this.successMssg = '';
      this.errorMssg = '';
    }, 5000); 
  }
}
