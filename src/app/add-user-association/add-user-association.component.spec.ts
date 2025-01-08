import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAssociationComponent } from './add-user-association.component';

describe('AddUserAssociationComponent', () => {
  let component: AddUserAssociationComponent;
  let fixture: ComponentFixture<AddUserAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
