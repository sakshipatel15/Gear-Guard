import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationViewComponent } from './escalation-view.component';

describe('EscalationViewComponent', () => {
  let component: EscalationViewComponent;
  let fixture: ComponentFixture<EscalationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscalationViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
