import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-association-search-details',
  standalone: false,
  
  templateUrl: './association-search-details.component.html',
  styleUrl: './association-search-details.component.css'
})
export class AssociationSearchDetailsComponent {

  
    selectedMinute: any | null = null;
    association: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient, private dialog: MatDialog, public dialogRef: MatDialogRef<AssociationSearchDetailsComponent>) { 
      this.data = data || { name: '', members: [], minutes: []};
      console.log('Association data received: ', this.data);
    }
  
    ngOnInit(): void {
      if (!this.data) {
        this.data = { name: 'Non spécifié', members: [], minutes: [] }; // Fallback
      }
        console.log('Association details loaded: ', this.association);
    }
  
    closeDialog(): void {
      
    }
   
}