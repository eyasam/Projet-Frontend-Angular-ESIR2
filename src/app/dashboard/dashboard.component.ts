import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { AssociationDetailsComponent } from '../association-details/association-details.component';
import { AssociationSearchDetailsComponent } from '../association-search-details/association-search-details.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  associationResults: any[] =[];

  constructor(private http: HttpClient,private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      this.associationResults = [];
    } else {
      
      this.http.get<any[]>(`http://localhost:3000/users`).subscribe(
        (users) => {
          this.searchResults = users.filter(
            (user) =>
              user.id.toString().includes(this.searchTerm) ||
              user.lastname.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        },
        (error) => {
          console.error('Erreur lors de la recherche des utilisateurs', error);
        }
      );

      
      this.http.get<any[]>(`http://localhost:3000/associations`).subscribe(
        (associations) => {
          this.associationResults = associations.filter(
            (association) =>
              association.id.toString().includes(this.searchTerm) ||
              association.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        },
        (error) => {
          console.error('Erreur lors de la recherche des associations', error);
        }
      );
    }
  }

  

  viewUserDetails(id: number): void {
    //this.router.navigate(['/users', id]);

    this.http.get(`http://localhost:3000/users/${id}`).subscribe(
      (user) => {
        console.log('User details', user);
        //alert(`User details: ${JSON.stringify(user)}`);
        this.dialog.open(UserDetailsComponent, {
          width: '700px',
          data: user
        });
      },
      (error) => {
        console.error('Error while fetching user details', error);
      }
    );
  }

  viewAssociationDetails(id: number): void {
    // Affichage des détails de l'association
    this.http.get(`http://localhost:3000/associations/${id}`).subscribe(
      (association) => {
        if(association){
        console.log('Association details', association);
        this.dialog.open(AssociationSearchDetailsComponent, {
          width: '700px',
          data: association,
        });
      } else {
        console.error('Association not found');
      }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'association', error);
      }
    );
  }


 goTo(route: string): void {
    this.router.navigateByUrl(route);
  }

}