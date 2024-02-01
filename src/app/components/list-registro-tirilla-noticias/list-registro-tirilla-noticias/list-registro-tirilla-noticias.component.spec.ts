import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegistroTirillaNoticiasComponent } from './list-registro-tirilla-noticias.component';

describe('ListRegistroTirillaNoticiasComponent', () => {
  let component: ListRegistroTirillaNoticiasComponent;
  let fixture: ComponentFixture<ListRegistroTirillaNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegistroTirillaNoticiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRegistroTirillaNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
