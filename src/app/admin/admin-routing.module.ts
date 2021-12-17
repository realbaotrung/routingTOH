import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    AdminComponent,
    ManageHeroesComponent,
    ManageCrisesComponent,
    AdminDashboardComponent,
} from './index';
import { AuthGuard } from '../auth/auth.guard';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard], // Add the Route Guard here
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    { path: 'crises', component: ManageCrisesComponent },
                    { path: 'heroes', component: ManageHeroesComponent },
                    { path: '', component: AdminDashboardComponent },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
