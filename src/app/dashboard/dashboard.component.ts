import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient,private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  // search(): void {
  //   this.http.get<any[]>(`http://localhost:3000/users`).subscribe(
  //     (users) => {
  //       this.searchResults = users;
  //     },
  //     (error) => {
  //       console.error('Error while searching users', error);
  // });
  // }

  // onSearch(): void {
  //   if(this.searchTerm.trim() === ''){
  //     this.search();
  //   }else{
  //     this.searchResults = this.searchResults.filter((user) => 
  //   user.id.toString().includes(this.searchTerm) || user.lastname.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  // }

  // onSearch(): void {
  //   if(this.searchTerm.trim() === ''){
  //     this.searchResults = [];
  //   }else{
  //     this.http.get<any[]>(`http://localhost:3000/users?search=${this.searchTerm}`).subscribe(
  //       (users) => {
  //         this.searchResults = users;
  //       },
  //       (error) => {
  //         console.error('Error while searching users', error);
  //     });
  //   }
  // }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
    } else {
      const searchId = parseInt(this.searchTerm, 10); // Convertir en nombre pour ID
      this.http.get<any[]>(`http://localhost:3000/users`).subscribe(
        (users) => {
          // Rechercher uniquement l'utilisateur correspondant à l'ID ou au nom
          this.searchResults = users.filter(
            (user) =>
              user.id === searchId || 
              user.lastname.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        },
        (error) => {
          console.error('Erreur lors de la recherche des utilisateurs', error);
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



 goTo(route: string): void {
    this.router.navigateByUrl(route);
  }

}
