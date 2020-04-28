import { TestBed } from '@angular/core/testing';

import { FalhaService } from './falha.service';

describe('FalhaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FalhaService = TestBed.get(FalhaService);
    expect(service).toBeTruthy();
  });
});
