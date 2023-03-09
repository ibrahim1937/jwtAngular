import { TestBed } from '@angular/core/testing';

import { MainInterceptorInterceptor } from './main-interceptor.interceptor';

describe('MainInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MainInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MainInterceptorInterceptor = TestBed.inject(MainInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
