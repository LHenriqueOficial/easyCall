import { TestBed } from '@angular/core/testing';

import { ContagemService } from './contagem.service';

describe('ContagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContagemService = TestBed.get(ContagemService);
    expect(service).toBeTruthy();
  });
});
