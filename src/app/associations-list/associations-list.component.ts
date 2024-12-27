import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AssociationDetailsComponent } from '../association-details/association-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

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
          width: '400px',
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

  modifyRoleAssociation(associationId: number, modifyRoleAssociation: any[]): void {
    modifyRoleAssociation.forEach(role => { 
    this.http.put(`http://localhost:3000/roles/${role.id}/${associationId}`,  {name: role.role}).subscribe(()=> {
      this.snackBar.open('Role modifié avec succès', 'Fermer', {duration: 3000});
      this.fetchAssociations();
     },
     error => {
      this.snackBar.open('Erreur lors de la modification du role', 'Fermer', {duration: 3000});
      console.error('Error updating role', error);
     });
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
  
}
