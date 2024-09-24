import { TestBed } from '@angular/core/testing';

import { JiraService } from './jira.service';

describe('JiraServiceService', () => {
  let service: JiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
