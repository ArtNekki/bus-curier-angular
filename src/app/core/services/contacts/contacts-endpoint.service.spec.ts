import { TestBed } from '@angular/core/testing';

import { ContactsEndpointService } from './contacts-endpoint.service';

describe('ContactsEndpointService', () => {
  let service: ContactsEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
