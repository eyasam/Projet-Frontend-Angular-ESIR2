import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AssociationDetailsComponent } from '../association-details/association-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { AssociationEditComponent } from '../association-edit/association-edit.component';
import { AddRoleFormComponent } from '../add-role-form/add-role-form.component';

@Component({
  selector: 'app-associations-list',
  standalone: false,
  
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.css'
})
export class AssociationsListComponent implements OnInit {
  associations: any[] = [];
  errorMessages: string = '' ;

  constructor(private http: HttpClient, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchAssociations();
  }

  fetchAssociations() {
    this.http.get('http://localhost:3000/associations').subscribe(
      {
        next: (data: any) => {
          this.associations = data;
        },
        error: (error) => {
          this.errorMessages = 'Error fetching associations';
          console.error(error);
        }
      }
    );
  }

  // ViewAssociationDetails(association: any): void {
  //   this.http.get<any[]>(`http://localhost:3000/associations/${association.id}/minutes`).subscribe({
  //     next: (min) => {
  //       const dialogData = {
  //         name: association.name,
  //         members: association.members,
  //         min
  //       };
  //       console.log('Association :', association);
  //       this.dialog.open(AssociationDetailsComponent, {
  //         width: '700px',
  //         data: dialogData
  //       });
  //     },
  //     error: (error) => {
  //       console.error('Error fetching association minutes', error);
  //     }
  //   });
  // }

  ViewAssociationDetails(association: any): void {
    // Appel de l'API pour récupérer les détails de l'association
    const associationId = association.id;
  
    // Récupérer les membres et les minutes
    this.http.get(`http://localhost:3000/associations/${associationId}/minutes`).subscribe(
      (minutes: any) => {
        const data = {
          ...association, // Copie les données existantes (nom, id, etc.)
          minutes: minutes || [],
        };
  
        // Ouvrir le dialog avec les données complètes
        this.dialog.open(AssociationDetailsComponent, {
          width: '800px',
          data: data,
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des minutes :', error);
      }
    );
  }

  // modifyAssociation(association: any): void {
  //   this.http.put(`http://localhost:3000/associations/${association.id}`, association).subscribe({
  //     next: () => {
  //       this.snackBar.open('Association modifiée avec succès', 'Fermer', {duration: 3000});
  //       this.fetchAssociations();
  //     },
  //     error: (error) => {
  //       this.snackBar.open('Erreur lors de la modification de l\'association', 'Fermer', {duration: 3000});
  //       console.error('Error updating association', error);
  //     }
  //   });
  // }

//   modifyRoleAssociation(associationId: number, modifyRoleAssociation: any[]): void {
//     modifyRoleAssociation.forEach(role => { 
//     this.http.put(`http://localhost:3000/roles/${role.id}/${associationId}`,  {name: role.role}).subscribe(()=> {
//       this.snackBar.open('Role modifié avec succès', 'Fermer', {duration: 3000});
//       this.fetchAssociations();
//      },
//      error => {
//       this.snackBar.open('Erreur lors de la modification du role', 'Fermer', {duration: 3000});
//       console.error('Error updating role', error);
//      });
//   });
// }

// modifyRoleAssociation(associationId: number, modifyRoleAssociation: any[]): void {
//   // Exemple de payload attendu : [{ name: "Member", idUser: 12, idAssociation: 1 }, ...]
//   this.http.post(`http://localhost:3000/roles`, modifyRoleAssociation).subscribe({
//     next: () => {
//       this.snackBar.open('Rôle modifié avec succès', 'Fermer', { duration: 3000 });
//       this.fetchAssociations();
//     },
//     error: (error) => {
//       this.snackBar.open('Erreur lors de la modification du rôle', 'Fermer', { duration: 3000 });
//       console.error('Error updating role:', error); // Debug
//     },
//   });
// }

modifyRoleAssociation(associationId: number, modifyRoleAssociation: any[]): void {
  // Pour chaque rôle à modifier, on construit l'URL dynamique
  modifyRoleAssociation.forEach(role => {
    const url = `http://localhost:3000/roles/${role.idUser}/${associationId}`;

    const updatedRole = {
      idUser: role.idUser,  // ID du membre
      idAssociation: associationId,  // ID de l'association
      name: role.role  // Nom du rôle à mettre à jour
    };

    console.log('Updating role:', updatedRole);  // Debug

    // Appel API PUT pour chaque rôle
    this.http.put(url, updatedRole).subscribe({
      next: () => {
        this.snackBar.open('Rôle modifié avec succès', 'Fermer', { duration: 3000 });
        this.fetchAssociations();  // Rafraîchir les associations après la modification
      },
      error: (error) => {
        if (error.status === 409) {
          this.snackBar.open('Conflit: Ce rôle est déjà attribué à ce membre dans cette association.', 'Fermer', { duration: 3000 });
        } else {
          this.snackBar.open('Erreur lors de la modification du rôle', 'Fermer', { duration: 3000 });
          console.error('Error updating role', error);
        }
      }
    });
  });
}


// modifyRoleAssociation(associationId: number, modifyRoleAssociation: any[]): void {
//   const rolesToUpdate = modifyRoleAssociation.map(role => ({
//     idUser: role.id,
//     idAssociation: associationId,
//     name: role.role,
//   }));

//   console.log('rolesToUpdate :', rolesToUpdate);
//   console.log('associationId :', associationId);
//   this.http.post(`http://localhost:3000/roles`, rolesToUpdate).subscribe({
//     next: () => {
//       this.snackBar.open('Role modifié avec succès', 'Fermer', {duration: 3000});
//       this.fetchAssociations();
//     },
//     error: (error) => {
//       this.snackBar.open('Erreur lors de la modification du role', 'Fermer', {duration: 3000});
//       console.error('Error updating role', error);
//     }
//   });

//   }

  editAssociation(association: any): void {
    const dialRef = this.dialog.open(AssociationEditComponent, {
      width: '600px',
      data: {association}
    });

    dialRef.afterClosed().subscribe((updatedRoles: any) => {
      if (updatedRoles) {
        this.modifyRoleAssociation(association.id, updatedRoles);
      }
    });
  }

  deleteAssociation(association: any): void {
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer cette association ${association.name} ?`);
    if (confirmDelete) {
      this.http.delete(`http://localhost:3000/associations/${association.id}`).subscribe({
        next: () => {
          this.snackBar.open('Association supprimée avec succès', 'Fermer', {duration: 3000});
          this.fetchAssociations();
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression de l\'association', 'Fermer', {duration: 3000});
          console.error('Error deleting association', error);
        }
      });
    }
  }


  //Ajouter un role 
  // addRole(associationId: number, memberId: number): void {
  //   const newRole = {
  //     name: 'Membre',
  //     idUser: memberId,
  //     idAssociation: associationId,
  //   };

  //   this.http.post(`http://localhost:3000/roles`, newRole).subscribe({
  //     next: () => {
  //       this.snackBar.open('Role ajouté avec succès', 'Fermer', { duration: 3000 });
  //       this.fetchAssociations();
  //     },
  //     error: (error) => {
  //       this.snackBar.open('Erreur lors de l\'ajout du role', 'Fermer', { duration: 3000 });
  //       console.error('Error adding role', error);
  //     },
  //   });
  // }

  addRole(roleData: any): void {
    // const newRole = {
    //   name: role,
    //   idUser: memberId,
    //   idAssociation: associationId,
    // };
  
    // this.http.post('http://localhost:3000/roles', newRole).subscribe({
    //   next: () => {
    //     this.snackBar.open('Rôle ajouté avec succès', 'Fermer', { duration: 3000 });
    //     this.fetchAssociations();
    //   },
    //   error: (error) => {
    //     this.snackBar.open('Erreur lors de l\'ajout du rôle', 'Fermer', { duration: 3000 });
    //     console.error('Error adding role', error);
    //   },
    // });

    this.http.post('http://localhost:3000/roles', roleData).subscribe({
      next: () => {
        this.snackBar.open('Rôle ajouté avec succès', 'Fermer', { duration: 3000 });
        this.fetchAssociations();  // Rafraîchir les associations après l'ajout du rôle
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de l\'ajout du rôle', 'Fermer', { duration: 3000 });
        console.error('Error adding role', error);
      }
    });
  }

  openAddRole(association: any): void {
    const dialogRef = this.dialog.open(AddRoleFormComponent, {
      width: '600px',
      data: { association},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRole(result);
      }
    });
  }

  
  
  
}
