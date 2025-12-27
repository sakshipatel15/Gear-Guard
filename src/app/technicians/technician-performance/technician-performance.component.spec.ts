import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianPerformanceComponent } from './technician-performance.component';

describe('TechnicianPerformanceComponent', () => {
  let component: TechnicianPerformanceComponent;
  let fixture: ComponentFixture<TechnicianPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
