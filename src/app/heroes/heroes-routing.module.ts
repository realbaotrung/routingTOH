import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent, HeroDetailComponent } from './index';

const heroesRoutes: Routes = [
    { path: 'heroes', redirectTo: '/superheroes' },
    { path: 'hero/:id', redirectTo: '/superhero/:id' },
    { path: 'superheroes', component: HeroListComponent, data: { animation: 'heroes' } },
    { path: 'superhero/:id', component: HeroDetailComponent, data: { animation: 'hero' } },
];

@NgModule({
    imports: [RouterModule.forChild(heroesRoutes)],
    exports: [RouterModule],
})
export class HeroesRoutingModule {}
