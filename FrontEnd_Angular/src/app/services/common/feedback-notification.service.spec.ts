import { TestBed } from '@angular/core/testing';

import { FeedbackNotificationService } from './feedback-notification.service';

describe('FeedbackNotificationService', () => {
  let service: FeedbackNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
