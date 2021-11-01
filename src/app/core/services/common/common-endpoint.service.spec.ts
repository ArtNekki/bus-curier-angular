import { TestBed } from '@angular/core/testing';

import { CommonEndpointService } from './common-endpoint.service';

describe('CommonEndpointService', () => {
  let service: CommonEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
