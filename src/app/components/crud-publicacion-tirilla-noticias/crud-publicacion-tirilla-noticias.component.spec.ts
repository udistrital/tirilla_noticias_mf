import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPublicacionTirillaNoticiasComponent } from './crud-publicacion-tirilla-noticias.component';

describe('CrudPublicacionTirillaNoticiasComponent', () => {
  let component: CrudPublicacionTirillaNoticiasComponent;
  let fixture: ComponentFixture<CrudPublicacionTirillaNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudPublicacionTirillaNoticiasComponent]
    });
    fixture = TestBed.createComponent(CrudPublicacionTirillaNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
