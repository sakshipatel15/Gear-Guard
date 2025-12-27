import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTimelineComponent } from './equipment-timeline.component';

describe('EquipmentTimelineComponent', () => {
  let component: EquipmentTimelineComponent;
  let fixture: ComponentFixture<EquipmentTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
