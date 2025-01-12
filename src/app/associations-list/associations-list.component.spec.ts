import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationsListComponent } from './associations-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssociationsListComponent', () => {
  let component: AssociationsListComponent;
  let fixture: ComponentFixture<AssociationsListComponent>;
  
  
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AssociationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
