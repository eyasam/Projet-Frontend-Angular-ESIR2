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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<AddRoleFormComponent>,
private http: HttpClient, private snackBar: MatSnackBar) {
    // this.roleForm = this.fb.group({
    //   name: ['', Validators.required],
    //   members: ['', Validators.required]
    // });
  }

  ngOnInit(): void {
    // this.members = this.data.members;
    this.roleForm = this.fb.group({
      memberId: ['', Validators.required],
      role: ['', Validators.required]
    });

    // Récupérer les membres de l'association
    this.fetchMembers();
  }

  fetchMembers(): void {
    const associationId = this.data.association.id;

    // this.http.get<any[]>(`http://localhost:3000/associations/${associationId}`).subscribe({
    //   next: (members) => {
    //     this.members = members;
    //   },
    //   error: (err) => {
    //     console.error('Erreur lors de la récupération des membres', err);
    //     this.snackBar.open('Erreur lors de la récupération des membres', 'Fermer', { duration: 3000 });
    //   }
    // });

    this.http.get<any>(`http://localhost:3000/associations/${associationId}`).subscribe({
      next: (association) => {
        // Assumer que la liste des membres est incluse dans la réponse
        this.members = association.members || [];  // Utilise les membres si présents dans la réponse
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des membres', err);
        this.snackBar.open('Erreur lors de la récupération des membres', 'Fermer', { duration: 3000 });
      }
    });
  }


  // onSubmit(): void {
  //   if (this.roleForm.valid) {
  //     const { memberId, role } = this.roleForm.value;
  //     const selectedMember = this.members.find(member => member.id === memberId);

  //     // Créer l'objet au format attendu par l'API
  //     const roleData = {
  //       name: role,               // Rôle choisi par l'utilisateur
  //       idUser: selectedMember.id, // ID du membre
  //       idAssociation: this.data.association.id  // ID de l'association
  //     };

  //     console.log('Payload to send:', roleData); // Afficher les données envoyées pour debug

  //     // Fermer la boîte de dialogue et retourner les données sous le bon format
  //     this.dialogRef.close(roleData);
  //   } else {
  //     console.error('Form is invalid');
  //   }
  // }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const { memberId, role } = this.roleForm.value;
      const selectedMember = this.members.find((member) => member.id === memberId);

      if (selectedMember) {
        const roleData = {
          name: role,               // Rôle choisi par l'utilisateur
          idUser: selectedMember.id, // ID du membre
          idAssociation: this.data.association.id  // ID de l'association
        };

        this.http.post(`http://localhost:3000/roles`, roleData).subscribe({
          next: () => {
            this.snackBar.open('Rôle ajouté avec succès', 'Fermer', { duration: 3000 });
            this.dialogRef.close(roleData); // Fermer la boîte de dialogue avec les données envoyées
          },
          error: (error) => {
            this.snackBar.open('Erreur lors de l\'ajout du rôle', 'Fermer', { duration: 3000 });
            console.error('Erreur lors de l\'ajout du rôle', error);
          }
        });
      }
    } else {
      console.error('Formulaire invalide');
    }
  }

}
