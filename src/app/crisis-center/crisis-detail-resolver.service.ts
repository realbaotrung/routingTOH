import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Crisis } from './crisis';
import { CrisisService } from './crisis.service';

@Injectable({
    providedIn: 'root',
})
export class CrisisDetailResolverService implements Resolve<Crisis> {
    constructor(private cs: CrisisService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<Crisis> | Observable<never> {
        const id: string = route.paramMap.get('id')!;

        return this.cs.getCrisis(id).pipe(
            take(1),
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
