import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAssociationComponent } from './add-association.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddAssociationComponent', () => {
  let component: AddAssociationComponent;
  let fixture: ComponentFixture<AddAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AddAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
