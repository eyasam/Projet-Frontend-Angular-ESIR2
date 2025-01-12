import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddMinuteDialogComponent } from './add-minute-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddMinuteDialogComponent', () => {
  let component: AddMinuteDialogComponent;
  let fixture: ComponentFixture<AddMinuteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      declarations: [AddMinuteDialogComponent],
      providers: [
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { 
            associationId: 1
          } 
        },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMinuteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
