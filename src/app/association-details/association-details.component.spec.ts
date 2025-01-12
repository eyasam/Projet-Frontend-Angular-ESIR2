import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMinuteDialogComponent } from '../add-minute-dialog/add-minute-dialog.component';
import { MinuteDetailsDialogComponent } from '../minute-details-dialog/minute-details-dialog.component';
import { CommonModule } from '@angular/common';
import { AssociationDetailsComponent } from './association-details.component';
import { HttpClient } from '@angular/common/http';

describe('AssociationDetailsComponent', () => {
  let component: AssociationDetailsComponent;
  let fixture: ComponentFixture<AssociationDetailsComponent>;
  let dialog: MatDialog;
  let httpMock: HttpTestingController;

  const mockData = {
    id: 1,
    name: 'Association Test',
    members: [{ id: 1, name: 'Member 1' }],
    minutes: [{ id: 1, title: 'Minute 1' }]
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationDetailsComponent],
      imports: [HttpClientTestingModule, CommonModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
        MatDialog
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationDetailsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with provided data', () => {
    expect(component.data).toEqual(mockData);
  });


  

  it('should open AddMinuteDialog and update data when minute is added', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue({ subscribe: (callback: any) => callback(true) });
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    component.openAddMinuteDialog();

    expect(dialog.open).toHaveBeenCalledWith(AddMinuteDialogComponent, {
      width: '800px',
      data: { associationId: mockData.id }
    });

    const updatedData = { ...mockData, minutes: [...mockData.minutes, { id: 2, title: 'Minute 2' }] };

    const req = httpMock.expectOne(`http://localhost:3000/associations/${mockData.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(updatedData);

    expect(component.data.minutes.length).toBe(2);
  });

  it('should show minute details when showMinuteDetails is called', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['open']);
    spyOn(dialog, 'open').and.callThrough();

    component.showMinuteDetails(1);

    const req = httpMock.expectOne(`http://localhost:3000/minutes/1`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1, title: 'Minute 1' });

    expect(dialog.open).toHaveBeenCalledWith(MinuteDetailsDialogComponent, {
      width: '700px',
      data: { id: 1, title: 'Minute 1' }
    });
  });

  it('should handle error when fetching minute details', () => {
    spyOn(console, 'error');
    component.showMinuteDetails(999);
  
    const req = httpMock.expectOne(`http://localhost:3000/minutes/999`);
    expect(req.request.method).toBe('GET');
  
    const errorEvent = new ErrorEvent('Network error');
    req.error(errorEvent);
  
    expect(console.error).toHaveBeenCalledWith('Error fetching minute details', jasmine.objectContaining({
      name: 'HttpErrorResponse',
      status: 0,
      statusText: 'Unknown Error',
      error: errorEvent
    }));
  });
  

  it('should close minute details', () => {
    component.selectedMinute = { id: 1, title: 'Minute 1' };
    component.closeMinuteDetails();
    expect(component.selectedMinute).toBeNull();
  });
});
