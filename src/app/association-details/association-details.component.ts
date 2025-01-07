import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MinuteDetailsDialogComponent } from '../minute-details-dialog/minute-details-dialog.component';

@Component({
  selector: 'app-association-details',
  standalone: false,
  
  templateUrl: './association-details.component.html',
  styleUrl: './association-details.component.css'
})
export class AssociationDetailsComponent {

  selectedMinute: any | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private http: HttpClient,
   private dialog: MatDialog,
    public dialogRef: MatDialogRef<AssociationDetailsComponent>) {		
    	this.data = data || { name: '', members: [], minutes: []};		
    	console.log('Association data received: ', this.data);		
	}

  ngOnInit(): void {
  if(!this.data) {
    console.warn('No data provided for association details !');
    this.data = { name: 'Non spécifié', members: [], minutes: [] }; 
    }
    
    console.log('Association data received: ', this.data);
  }

  showMinuteDetails(minuteId: number): void {
    const url = `http://localhost:3000/minutes/${minuteId}`;
    this.http.get(url).subscribe({
      next: (minute) => {
        this.dialog.open(MinuteDetailsDialogComponent, {
          width: '700px',
          data: minute});
      },
      error: (error) => {
        console.error('Error fetching minute details', error);
      }
    });
  }

  closeMinuteDetails(): void {
    this.selectedMinute = null;
  }
}
