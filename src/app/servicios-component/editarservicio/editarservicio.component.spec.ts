import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarservicioComponent } from './editarservicio.component';

describe('EditarservicioComponent', () => {
  let component: EditarservicioComponent;
  let fixture: ComponentFixture<EditarservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
