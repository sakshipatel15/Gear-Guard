import { TestBed } from '@angular/core/testing';

import { IntelligenceService } from './intelligence.service';

describe('IntelligenceService', () => {
  let service: IntelligenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntelligenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
