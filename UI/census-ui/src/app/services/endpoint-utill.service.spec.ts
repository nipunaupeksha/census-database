import { TestBed } from '@angular/core/testing';

import { EndpointUtillService } from './endpoint-utill.service';

describe('EndpointUtillService', () => {
  let service: EndpointUtillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointUtillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
