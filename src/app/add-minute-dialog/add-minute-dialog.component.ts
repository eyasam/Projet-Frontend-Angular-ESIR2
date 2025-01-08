import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-minute-dialog',
  standalone: false,
  
  templateUrl: './add-minute-dialog.component.html',
  styleUrl: './add-minute-dialog.component.css'
})
export class AddMinuteDialogComponent implements OnInit{
  minuteForm!: FormGroup;
  users: any[] = [];
  selectedVoters: number[] =[];

  constructor(private fb: FormBuilder, private http: HttpClient, public dialogRef: MatDialogRef<AddMinuteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.minuteForm = this.fb.group({
      content: ['', [Validators.required]],
      idVoters: [[], [Validators.required]],
      date: ['', [Validators.required]],
      
    
    });
  }
  ngOnInit(): void {
      this.fetchUsers();
  }

  fetchUsers():void {
    this.http.get<any>(`http://localhost:3000/associations/${this.data.associationId}`).subscribe({
      next: (response) => {
        console.log('Membres de l\'association:', response.members);
        this.users = response.members;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des membres de l\'association:', err);
      }
    });
  }
  

onVoterSelectionChange(event: any, voterId: number): void {
  const idVoters = this.minuteForm.get('idVoters')?.value;

  if (event.target.checked) {
    
    idVoters.push(voterId);
  } else {
    
    const index = idVoters.indexOf(voterId);
    if (index > -1) {
      idVoters.splice(index, 1);
    }
  }

  
  this.minuteForm.get('idVoters')?.setValue([...idVoters]);
}

isVoterSelected(voterId: number): boolean {
  const idVoters = this.minuteForm.get('idVoters')?.value;
  return idVoters.includes(voterId);
}




  saveMinute(): void {
    if (this.minuteForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    const content = this.minuteForm.get('content')?.value;
    const date = this.formatDate(this.minuteForm.get('date')?.value);
    const idVoters = this.minuteForm.get('idVoters')?.value;

    const payload = {
      content,
      idVoters,
      date,
      idAssociation: this.data.associationId, 
    };

    console.log('Données envoyées:', payload);

    this.http.post('http://localhost:3000/minutes', payload).subscribe({
      next: (response) => {
        console.log('Minute ajoutée avec succès', response);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la minute:', err);
        this.dialogRef.close(false);
      },
    });
  }


  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; 
  }

  
  closeDialog(): void {
    this.dialogRef.close();
  }

}
