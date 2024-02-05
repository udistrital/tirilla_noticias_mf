import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTirillaNoticiasComponent } from './list-tirilla-noticias.component';

describe('ListTirillaNoticiasComponent', () => {
  let component: ListTirillaNoticiasComponent;
  let fixture: ComponentFixture<ListTirillaNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTirillaNoticiasComponent]
    });
    fixture = TestBed.createComponent(ListTirillaNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
