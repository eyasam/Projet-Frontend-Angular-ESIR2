import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MinuteDetailsDialogComponent } from './minute-details-dialog.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

describe('MinuteDetailsDialogComponent', () => {
  let component: MinuteDetailsDialogComponent;
  let fixture: ComponentFixture<MinuteDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [MinuteDetailsDialogComponent],
      providers: [
        DatePipe,
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: {} }, 
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinuteDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
