import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptacionComponent } from './aceptacion.component';

describe('AceptacionComponent', () => {
  let component: AceptacionComponent;
  let fixture: ComponentFixture<AceptacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
