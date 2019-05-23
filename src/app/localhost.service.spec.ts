import { TestBed } from '@angular/core/testing';

import { LocalhostService } from './localhost.service';

describe('LocalhostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalhostService = TestBed.get(LocalhostService);
    expect(service).toBeTruthy();
  });
});
