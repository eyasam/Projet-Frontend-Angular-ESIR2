import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationSearchDetailsComponent } from './association-search-details.component';

describe('AssociationSearchDetailsComponent', () => {
  let component: AssociationSearchDetailsComponent;
  let fixture: ComponentFixture<AssociationSearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationSearchDetailsComponent]
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
