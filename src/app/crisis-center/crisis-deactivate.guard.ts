import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | boolean;
}

@Injectable({
    providedIn: 'root',
})

// For component that implement canDeactivate() method and and also in routing.module
export class CrisisDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
// ========================
// For specified Component
// ========================
// export class CrisisDeactivateGuard implements CanDeactivate<CrisisDetailComponent> {
//     canDeactivate(
//         component: CrisisDetailComponent,
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot,
//     ): Observable<boolean> | boolean {
//         // Get the snapshot of Crisis Center ID
//         console.log(route.paramMap.get('id'));
//
//         // Get the current URL
//         console.log(state.url);
//
//         // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
//         if (!component.crisis || component.crisis.name === component.editName) {
//             return true;
//         }
//
//         // Otherwise ask the user with the dialog service and return its
//         // Observable which resolves to true or false when the user decides
//         return component.dialogService.confirm(`Discard changes?`);
//     }
// }
