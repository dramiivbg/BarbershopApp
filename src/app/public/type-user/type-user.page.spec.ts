import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeUserPage } from './type-user.page';

describe('TypeUserPage', () => {
  let component: TypeUserPage;
  let fixture: ComponentFixture<TypeUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
