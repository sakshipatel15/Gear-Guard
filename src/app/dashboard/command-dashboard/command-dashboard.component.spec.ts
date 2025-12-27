import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandDashboardComponent } from './command-dashboard.component';

describe('CommandDashboardComponent', () => {
  let component: CommandDashboardComponent;
  let fixture: ComponentFixture<CommandDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
