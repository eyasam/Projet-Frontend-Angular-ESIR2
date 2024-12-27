import { Component , Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-association-edit',
  standalone: false,
  
  templateUrl: './association-edit.component.html',
  styleUrl: './association-edit.component.css'
})
export class AssociationEditComponent implements OnInit {
  roleForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private dialogRef: MatDialogRef<AssociationEditComponent>) {
    // this.roleForm = this.fb.group({
    //   name: [data.name, Validators.required],
    //   members: [data.members, Validators.required]
    // });
  }


  ngOnInit(): void {
      this.roleForm = this.fb.group({});
      this.data.association.members.forEach((member: any) => {
        this.roleForm.addControl(`role_${member.id}`, this.fb.control(member.role));
      });
  }

  onSubmit(): void {
    if(this.roleForm.valid){
     const updatedRoles = this.data.association.members.map((member: any) => ({
      idUser: member.id,
      role: this.roleForm.get(`role_${member.id}`)?.value
     }));

     this.dialogRef.close(updatedRoles);
    }
  }



}
