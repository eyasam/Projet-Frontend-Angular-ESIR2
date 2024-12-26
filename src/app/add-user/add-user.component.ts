import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';


@Component({
  selector: 'app-add-user',
  standalone: false,
  
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  user = { lastname: '', firstname: '', age: 0 , password: ''};

  userForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
      this.userForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(18)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }
  addUser(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.http.post('http://localhost:3000/users', newUser).subscribe({
        next: () => {
          alert('User added successfully');
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error while adding user', error);
        }
      });
    }

    }
   

}
