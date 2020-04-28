import { TestBed } from '@angular/core/testing';

import { OsManutencaoService } from './os-manutencao.service';

describe('OsManutencaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OsManutencaoService = TestBed.get(OsManutencaoService);
    expect(service).toBeTruthy();
  });
});
