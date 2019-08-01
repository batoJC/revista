import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesorsComponent } from './assesors.component';

describe('AssesorsComponent', () => {
  let component: AssesorsComponent;
  let fixture: ComponentFixture<AssesorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
