import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { last, lastValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-users-list',
  standalone: false,
  
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age', 'actions'];
  dataSource = [];
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  ngOnInit() : void {
    this.loadUsers();
    console.log('UsersListComponent initialized');
    
  }

  loadUsers(): void {
    const request: Observable<any> = this.http.get('http://localhost:3000/users',{ observe: 'response' });
    //lastValueFrom(request).then((response) => this.dataSource = response.body);
    request.subscribe((response) => this.dataSource = response.body);
  }

  searchUsers(): void {
    if(this.searchQuery.trim()){
      const request: Observable<any> = this.http.get(`http://localhost:3000/users?search=${this.searchQuery}`,{ observe: 'response' });
      request.subscribe((response) => this.dataSource = response.body || []);
    }else{
      this.loadUsers();
    }
  }

  editUser(id: number): void {
    console.log('Edit user with id', id);
    this.router.navigate([`/users/edit/${id}`]);
  }

  deleteUser(id: number): void {
    console.log('Delete user with id', id);
    if(confirm('Are you sure you want to delete this user?')){
      this.http.delete(`http://localhost:3000/users/${id}`).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error while deleting user', error);
        }
      });
    }
  }
  
  viewUser(id: number): void {
    console.log('View user with id', id);
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

}

