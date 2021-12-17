import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Crisis } from './crisis';
import { CRISES } from './mock-crises';

@Injectable()
export class CrisisService {
    static nextCrisisId = 100;
    private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);

    constructor() {}

    getCrises() {
        return this.crises$;
    }

    getCrisis(id: number | string) {
        return this.getCrises().pipe(map(crises => crises.find(crisis => crisis.id === +id)!));
    }
}
