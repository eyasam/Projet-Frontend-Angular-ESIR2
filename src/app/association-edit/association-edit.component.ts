import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-association-edit',
  standalone: false,

  templateUrl: './association-edit.component.html',
  styleUrl: './association-edit.component.css'
})
export class AssociationEditComponent implements OnInit {
  roleForm!: FormGroup;
  memberId!: number;
  associationId!: number;
  currentRole: any;
  members: any[] = [];

  availableRoles: string[] = ['Membre', 'Trésorier', 'Président', 'Secrétaire'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<AssociationEditComponent>, private http: HttpClient, private snackBar: MatSnackBar, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.associationId = this.data.association.id; // Récupérer l'ID de l'association des données du dialog
    console.log('Association ID:', this.associationId);

    if (!this.associationId) {
      console.error('ID de l\'association non défini');
      this.snackBar.open('ID de l\'association non défini', 'Fermer', { duration: 3000 });
      return;
    }

    this.roleForm = this.fb.group({
      memberId: ['', Validators.required],
      role: ['', Validators.required]
    });


    this.fetchMembers();

  }

  fetchMembers(): void {
    if (this.associationId) {
      this.http.get<any>(`http://localhost:3000/associations/${this.associationId}`).subscribe({
        next: (association) => {
          if (association && association.members) {
            this.members = association.members;
          } else {
            console.error('Aucun membre trouvé');
            this.snackBar.open('Aucun membre trouvé', 'Fermer', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des membres', err);
          this.snackBar.open('Erreur lors de la récupération des membres', 'Fermer', { duration: 3000 });
        }
      });
    } else {
      console.error('ID de l\'association non défini');
      this.snackBar.open('ID de l\'association non défini', 'Fermer', { duration: 3000 });
    }
  }

  // Fonction pour récupérer les informations du rôle
  fetchRole(): void {
    const selectedMember = this.roleForm.get('memberId')?.value;
    if (selectedMember && this.associationId) {
      const url = `http://localhost:3000/roles/${selectedMember}/${this.associationId}`;
      this.http.get<any>(url).subscribe({
        next: (data) => {
          this.currentRole = data;
          this.roleForm.patchValue({
            role: data.name
          });
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du rôle', err);
          this.snackBar.open('Erreur lors de la récupération du rôle', 'Fermer', { duration: 3000 });
        }
      });
    }
  }



  onSubmit(): void {
    if (this.roleForm.valid) {
      const memberId = this.roleForm.get('memberId')?.value;
      const updatedRole = {
        name: this.roleForm.value.role,
        idUser: memberId,
        idAssociation: this.associationId
      };

      this.http.put(`http://localhost:3000/roles/${memberId}/${this.associationId}`, updatedRole)
        .subscribe({
          next: () => {
            this.snackBar.open('Rôle mis à jour avec succès', 'Fermer', { duration: 3000 });
            this.dialogRef.close(updatedRole); // Fermer la boîte de dialogue avec les données mises à jour
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du rôle', error);
            this.snackBar.open('Erreur lors de la mise à jour du rôle', 'Fermer', { duration: 3000 });
          }
        });
    }
  }

}