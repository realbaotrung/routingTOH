import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

@Injectable()
export class CrisisDetailResolverService implements Resolve<Crisis> {
    constructor(private cs: CrisisService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<Crisis> | Observable<never> {
        const id: string = route.paramMap.get('id')!;

        return this.cs.getCrisis(id).pipe(
            //  After retrieving the first value from Observable returned by `getCrisis()`
            take(1), // `take(1)` ensures that the Observable completes
            mergeMap(crisis => {
                if (crisis == null) {
                    this.router.navigate(['/crisis-center']);
                    return EMPTY;
                }
                return of(crisis);
            }),
        );
    }
}
