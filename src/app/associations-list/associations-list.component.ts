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
  modifyRoleAssociation(associationId: number, modifyRoleAssociation: any): void {
    if (Array.isArray(modifyRoleAssociation)) {
      modifyRoleAssociation.forEach(role => {
        const url = `http://localhost:3000/roles/${role.idUser}/${associationId}`;
  
        const updatedRole = {
          idUser: role.idUser,
          idAssociation: associationId,
          name: role.role 
        };
        
  
        console.log('Mise à jour du rôle');
  
        // Appel API PUT pour chaque rôle
        this.http.put(url, updatedRole).subscribe({
          next: () => {
            // Affichage du message de succès
            this.snackBar.open('Rôle modifié avec succès', 'Fermer', { duration: 3000 });
  
            // Recharger les associations après la mise à jour
            this.fetchAssociations();
          },
          error: (error) => {
            // Gérer les erreurs en cas de conflit ou autre
            if (error.status === 409) {
              this.snackBar.open('Conflit: Ce rôle est déjà attribué à ce membre dans cette association.', 'Fermer', { duration: 3000 });
            } else {
              this.snackBar.open('Erreur lors de la modification du rôle', 'Fermer', { duration: 3000 });
              console.error('Erreur lors de la mise à jour du rôle', error);
            }
          }
        });
      });
    } else {
      console.error('modifyRoleAssociation n\'est pas un tableau', modifyRoleAssociation);
    }
  }
  
  
  editAssociation(association: any): void {
    const dialRef = this.dialog.open(AssociationEditComponent, {
      width: '600px',
      data: { association }
    });
  
    dialRef.afterClosed().subscribe((updatedRoles: any) => {
      if (updatedRoles) {
        // Assurez-vous que updatedRoles est un tableau
        if (!Array.isArray(updatedRoles)) {
          updatedRoles = [updatedRoles];  // Si ce n'est pas un tableau, le convertir en tableau
        }
        
        // Appel de la méthode pour modifier les rôles des membres de cette association
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

  addRole(roleData: any): void {

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
