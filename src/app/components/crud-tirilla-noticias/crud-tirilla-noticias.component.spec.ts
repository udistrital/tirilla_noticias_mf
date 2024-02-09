import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTirillaNoticiasComponent } from './crud-tirilla-noticias.component';

describe('CrudTirillaNoticiasComponent', () => {
  let component: CrudTirillaNoticiasComponent;
  let fixture: ComponentFixture<CrudTirillaNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudTirillaNoticiasComponent]
    });
    fixture = TestBed.createComponent(CrudTirillaNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
