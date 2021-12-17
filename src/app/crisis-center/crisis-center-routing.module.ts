import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    CrisisCenterHomeComponent,
    CrisisCenterComponent,
    CrisisDetailComponent,
    CrisisListComponent,
} from './index';
import { CrisisDeactivateGuard } from './crisis-deactivate.guard';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

const crisisCenterRoutes: Routes = [
    {
        path: '',
        component: CrisisCenterComponent,
        children: [
            {
                path: '',
                component: CrisisListComponent,
                children: [
                    {
                        path: ':id',
                        component: CrisisDetailComponent,
                        canDeactivate: [CrisisDeactivateGuard], // === Guard here ===
                        resolve: {
                            // === Pre-fetch component data ===
                            crisis: CrisisDetailResolverService,
                        },
                    },
                    { path: '', component: CrisisCenterHomeComponent },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(crisisCenterRoutes)],
    exports: [RouterModule],
})
export class CrisisCenterRoutingModule {}
