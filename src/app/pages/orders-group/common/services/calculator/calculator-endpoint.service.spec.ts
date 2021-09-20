import { TestBed } from '@angular/core/testing';

import { CalculatorEndpointService } from './calculator-endpoint.service';

describe('CalculatorEndpointService', () => {
  let service: CalculatorEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
