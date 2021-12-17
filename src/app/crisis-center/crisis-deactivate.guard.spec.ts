import { TestBed } from '@angular/core/testing';

import { CrisisDeactivateGuard } from './crisis-deactivate.guard';

describe('CanDeactivateGuard', () => {
    let guard: CrisisDeactivateGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CrisisDeactivateGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
