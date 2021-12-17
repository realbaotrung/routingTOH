import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';

import { HeroListComponent, HeroDetailComponent } from './index';

@NgModule({
    imports: [CommonModule, FormsModule, HeroesRoutingModule],
    declarations: [HeroListComponent, HeroDetailComponent],
})
export class HeroesModule {}
