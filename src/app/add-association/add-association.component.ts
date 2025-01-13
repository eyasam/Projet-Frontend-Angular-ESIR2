import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-association',
  standalone: false,
  
  templateUrl: './add-association.component.html',
  styleUrl: './add-association.component.css'
})
export class AddAssociationComponent implements OnInit {
  associationForm!: FormGroup;
  users: any[] = [];
  selectedUsers: number[] = [];
  

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.associationForm = this.fb.group({
      associationName: ['', Validators.required],
    
    });
   }

  ngOnInit(): void { 
   this.loadUsers();
  }

 

  loadUsers() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      this.users = users; 
    });
  }
  
   onUserCheckboxChange(userId: number, event: any) {
    if (event.checked) {
      this.selectedUsers.push(userId);  // Ajouter l'ID de l'utilisateur s'il est coché
    } else {
      const index = this.selectedUsers.indexOf(userId);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);  // s'il est  décoché
      }
    }
  }

 
  submit() {
    if (this.associationForm.invalid) {
      console.log("Le formulaire est invalide.");
      return;
    }

    const associationData = {
      name: this.associationForm.get('associationName')?.value,  
      userIds: this.selectedUsers,  // Liste des utilisateurs sélectionnés
    };

    console.log('Association form submitted with data:', associationData);

    this.http.post('http://localhost:3000/associations', associationData).subscribe({
      next: (response) => {
        console.log('Association ajoutée avec succès', response);
        alert('Association ajoutée avec succès!');
        this.router.navigate(['/associations']);  // Naviguer vers la liste des associations
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'association', error);
        alert('Erreur lors de l\'ajout de l\'association');
      }
    });
  }
  

}
