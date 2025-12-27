import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkcenterManagementComponent } from './workcenter-management.component';

describe('WorkcenterManagementComponent', () => {
  let component: WorkcenterManagementComponent;
  let fixture: ComponentFixture<WorkcenterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkcenterManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkcenterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
