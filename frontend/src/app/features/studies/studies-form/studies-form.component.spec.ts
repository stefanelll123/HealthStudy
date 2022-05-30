import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesFormComponent } from './studies-form.component';

describe('StudiesFormComponent', () => {
  let component: StudiesFormComponent;
  let fixture: ComponentFixture<StudiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudiesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
