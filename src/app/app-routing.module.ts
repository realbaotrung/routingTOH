import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent, ComposeMessageComponent } from './index';
import { AuthGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
    { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canLoad: [AuthGuard], // prevent PreLoadAllModule
    },
    {
        path: 'crisis-center',
        loadChildren: () =>
            import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
        data: { preload: true },
    },
    { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            enableTracing: true,
            preloadingStrategy: SelectivePreloadingStrategyService,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
