import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextActionPanelComponent } from './next-action-panel.component';

describe('NextActionPanelComponent', () => {
  let component: NextActionPanelComponent;
  let fixture: ComponentFixture<NextActionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextActionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
