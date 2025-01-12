import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AssociationSearchDetailsComponent } from './association-search-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssociationSearchDetailsComponent', () => {
  let component: AssociationSearchDetailsComponent;
  let fixture: ComponentFixture<AssociationSearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AssociationSearchDetailsComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Provide a mock value
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
