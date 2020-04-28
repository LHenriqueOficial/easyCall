import { TestBed } from '@angular/core/testing';

import { StatusOsService } from './status-os.service';

describe('StatusOsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusOsService = TestBed.get(StatusOsService);
    expect(service).toBeTruthy();
  });
});
