import { TestBed } from '@angular/core/testing';

import { OrderEndpointService } from './order-endpoint.service';

describe('OrderEndpointService', () => {
  let service: OrderEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
