import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AddRoleFormComponent } from './add-role-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('AddRoleFormComponent', () => {
  let component: AddRoleFormComponent;
  let fixture: ComponentFixture<AddRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoleFormComponent],
      imports: [MatDialogModule, HttpClientTestingModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule ],
      providers: [
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { 
            association: { 
              id: 1,
              members: [
                { id: 1, name: 'Member 1' },
                { id: 2, name: 'Member 2' },
                { id: 3, name: 'Member 3' }
              ]
            }
          } 
        },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
