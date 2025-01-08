import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MinuteDetailsDialogComponent } from '../minute-details-dialog/minute-details-dialog.component';
import { AddMinuteDialogComponent } from '../add-minute-dialog/add-minute-dialog.component';

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


  openAddMinuteDialog(): void {
    const dialogRef = this.dialog.open(AddMinuteDialogComponent, {
      width: '800px',
      data: { associationId: this.data.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Minute ajoutée avec succès');
        
        this.http.get(`http://localhost:3000/associations/${this.data.id}`).subscribe({
          next: (updatedData: any) => {
            this.data = updatedData; 
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour des données', error);
          }
        });
      }
    });
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
