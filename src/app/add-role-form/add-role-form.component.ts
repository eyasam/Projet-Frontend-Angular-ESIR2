import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-role-form',
  standalone: false,
  
  templateUrl: './add-role-form.component.html',
  styleUrl: './add-role-form.component.css'
})
export class AddRoleFormComponent implements OnInit {
  roleForm!: FormGroup;
  members: any[] = [];
  availableRoles: string[] = ['Membre', 'Trésorier', 'Président', 'Secrétaire'];
  submitted = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<AddRoleFormComponent>,
  private http: HttpClient, private snackBar: MatSnackBar) {
   
  }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      memberId: ['', Validators.required],
      role: ['', Validators.required], 
    });
  
    this.fetchMembers();
  }  

  fetchMembers(): void {
    const associationId = this.data.association.id;
    console.log('Fetching members for Association ID:', associationId);
  
    this.http.get<any>(`http://localhost:3000/associations/${associationId}`).subscribe({
      next: (association) => {
        console.log('Membres récupérés:', association.members);
        this.members = association.members || [];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des membres:', err);
        this.snackBar.open('Erreur lors de la récupération des membres', 'Fermer', { duration: 3000 });
      }
    });
  }
  onSubmit(): void {
    this.submitted = true; // Activer les messages d'erreur

    if (this.roleForm.valid) {
      const { memberId, role } = this.roleForm.value;
      console.log('Données du formulaire:', { memberId, role });

      const selectedMember = this.members.find((member) => member.id === memberId);

      if (selectedMember) {
        const roleData = {
          name: role,
          idUser: selectedMember.id,
          idAssociation: this.data.association.id
        };

        this.http.post(`http://localhost:3000/roles`, roleData).subscribe({
          next: () => {
            console.log('Rôle ajouté avec succès:', roleData);
            this.snackBar.open('Rôle ajouté avec succès', 'Fermer', { duration: 3000 });
            this.dialogRef.close(roleData);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout du rôle:', error);
            this.snackBar.open('Erreur lors de l\'ajout du rôle', 'Fermer', { duration: 3000 });
          }
        });
      }
    } else {
      console.error('Formulaire invalide', this.roleForm.errors);
    }
  }
  
}