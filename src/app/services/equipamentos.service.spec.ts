import { TestBed } from '@angular/core/testing';

import { EquipamentosService } from './equipamentos.service';

describe('EquipamentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipamentosService = TestBed.get(EquipamentosService);
    expect(service).toBeTruthy();
  });
});
