import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-minute-details-dialog',
  standalone: false,
  
  templateUrl: './minute-details-dialog.component.html',
  styleUrl: './minute-details-dialog.component.css'
})
export class MinuteDetailsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MinuteDetailsDialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
