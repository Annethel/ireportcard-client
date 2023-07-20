import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchClassViewComponent } from './sch-class-view.component';

describe('SchClassViewComponent', () => {
  let component: SchClassViewComponent;
  let fixture: ComponentFixture<SchClassViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchClassViewComponent]
    });
    fixture = TestBed.createComponent(SchClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
