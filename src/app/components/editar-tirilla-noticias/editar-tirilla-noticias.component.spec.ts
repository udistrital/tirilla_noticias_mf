import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTirillaNoticiasComponent } from './editar-tirilla-noticias.component';

describe('EditarTirillaNoticiasComponent', () => {
  let component: EditarTirillaNoticiasComponent;
  let fixture: ComponentFixture<EditarTirillaNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarTirillaNoticiasComponent]
    });
    fixture = TestBed.createComponent(EditarTirillaNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
