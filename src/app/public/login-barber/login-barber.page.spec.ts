import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginBarberPage } from './login-barber.page';

describe('LoginBarberPage', () => {
  let component: LoginBarberPage;
  let fixture: ComponentFixture<LoginBarberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBarberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
