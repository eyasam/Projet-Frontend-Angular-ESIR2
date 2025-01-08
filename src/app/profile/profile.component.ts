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
  showChangePasswordForm: boolean = false;
  isEditing: boolean = false;
  errorMssg: string = '';
  successMssg: string = '';
  userId: number | undefined;
  user: any = {};
  editUser: any = {};

  constructor(
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private api: ApiHelperService
  ) {
    this.profileForm = this.fb.group(
      {
        oldPass: ['', [Validators.required]],
        newPass: ['', [Validators.required, Validators.minLength(6)]],
        confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
    
  }

  
toggleEdit(): void {
  this.isEditing = !this.isEditing;

  if (this.isEditing) {
    this.editUser = { ...this.user };
  } else {
    this.editUser = {};
  }
}


updateProfile(): void {
  if (!this.userId) {
    this.errorMssg = 'Erreur : utilisateur non connecté.';
    this.hideMessageAfterDelay();
    return;
  }

  const updatePayload = {
    firstname: this.editUser.firstname,
    lastname: this.editUser.lastname,
    age: this.editUser.age,
  };

  const endpoint = `/users/${this.userId}`;
  this.api
    .put({ endpoint, data: updatePayload })
    .then(() => {
      this.user = { ...this.editUser };
      this.successMssg = 'Profil mis à jour avec succès.';
      this.isEditing = false;
      this.hideMessageAfterDelay();
    })
    .catch((error: any) => {
      this.errorMssg = 'Erreur lors de la mise à jour du profil : ' + error.message;
      this.hideMessageAfterDelay();
    });
}

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser(); 
    const token = this.tokenStorageService.getToken(); 

    if (user && token) {
      this.user = user;
      this.editUser = { ...user };
      this.userId = user.username;
      console.log('Utilisateur connecté, ID:', this.userId);

      const endpoint = `/users/${this.userId}`; 
      this.api
        .get({ endpoint })
        .then((response) => {
          this.user = response;
          console.log('Données utilisateur:', this.user);
        })
        .catch((error: any) => {
          this.errorMssg = 'Erreur lors de la récupération des données utilisateur : ' + error.message;
          this.hideMessageAfterDelay();
        });
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
  updatePassword(): void {
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
        this.toggleChangePasswordForm();
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
  
  toggleChangePasswordForm(): void {
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }
  hideMessageAfterDelay(): void {
    setTimeout(() => {
      this.successMssg = '';
      this.errorMssg = '';
    }, 5000); 
  }
}
