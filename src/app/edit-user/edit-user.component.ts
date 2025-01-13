import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  userId!: number;
  userForm: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder) {
   this.userForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    age: ['', [Validators.required]],
  });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUserData();
  }

  loadUserData(): void {
    this.http.get(`http://localhost:3000/users/${this.userId}`).subscribe((user) => {
      this.userForm.patchValue(user);
  },
   (error) => {
    console.error('Error while loading user data', error);
  }
    );
  }


  onSubmit(): void {
    if(this.userForm.valid){
      this.http.put(`http://localhost:3000/users/${this.userId}`, this.userForm.value).subscribe({
        next: () => {
          alert('User updated successfully');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error while updating user', error);
        }
      });
    }
  }


}
