import { TestBed } from '@angular/core/testing';

import { BarbershopService } from './barbershop-service';

describe('BarbershopService', () => {
  let service: BarbershopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarbershopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
