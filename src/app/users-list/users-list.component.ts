import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { last, lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: false,
  
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = [];

  constructor(private http: HttpClient) {}

  ngOnInit() : void {
    const request: Observable<any> = this.http.get('http://localhost:3000/users',{ observe: 'response' });
    //lastValueFrom(request).then((response) => this.dataSource = response.body);
    request.subscribe((response) => this.dataSource = response.body);
    console.log('UsersListComponent initialized');
    
  }


}

