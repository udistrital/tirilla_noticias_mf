import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTirillaNoticiasComponent } from './ver-tirilla-noticias.component';

describe('VerTirillaNoticiasComponent', () => {
  let component: VerTirillaNoticiasComponent;
  let fixture: ComponentFixture<VerTirillaNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerTirillaNoticiasComponent]
    });
    fixture = TestBed.createComponent(VerTirillaNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
