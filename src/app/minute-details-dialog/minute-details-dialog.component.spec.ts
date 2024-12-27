import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteDetailsDialogComponent } from './minute-details-dialog.component';

describe('MinuteDetailsDialogComponent', () => {
  let component: MinuteDetailsDialogComponent;
  let fixture: ComponentFixture<MinuteDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinuteDetailsDialogComponent]
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
