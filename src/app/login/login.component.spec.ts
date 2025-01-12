import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockApi: jasmine.SpyObj<ApiHelperService>;
  let mockToken: jasmine.SpyObj<TokenStorageService>;
  let mockRoute: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockApi = jasmine.createSpyObj('ApiHelperService', ['post']);
    mockToken = jasmine.createSpyObj('TokenStorageService', ['save', 'isLogged']);
    mockRoute = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ApiHelperService, useValue: mockApi},
        { provide: TokenStorageService, useValue: mockToken},
        { provide: Router, userValue: mockRoute}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with username and password fields', () => {
    const form = component.loginForm;
    expect(form.contains('username')).toBeTruthy();
    expect(form.contains('password')).toBeTruthy();
  });

  it('should require username and password fields to be filled', () => {
    const username = component.loginForm.get('username');
    const password = component.loginForm.get('password');

    username?.setValue('');
    password?.setValue('');
    expect(username?.valid).toBeFalsy();
    expect(password?.valid).toBeFalsy();

    username?.setValue('user');
    password?.setValue('password');
    expect(username?.valid).toBeTruthy();
    expect(password?.valid).toBeTruthy();
  });


  


});
