import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMinuteDialogComponent } from './add-minute-dialog.component';

describe('AddMinuteDialogComponent', () => {
  let component: AddMinuteDialogComponent;
  let fixture: ComponentFixture<AddMinuteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMinuteDialogComponent]
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
