import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AssociationEditComponent } from './association-edit.component';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('AssociationEditComponent', () => {
  let component: AssociationEditComponent;
  let fixture: ComponentFixture<AssociationEditComponent>;
  let mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationEditComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatFormFieldModule, MatInputModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { association: { id: 1 } } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} }, 
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
