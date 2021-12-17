import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

import {
    CrisisListComponent,
    CrisisDetailComponent,
    CrisisCenterComponent,
    CrisisCenterHomeComponent,
} from './index';

@NgModule({
    imports: [CommonModule, FormsModule, CrisisCenterRoutingModule],
    declarations: [
        CrisisCenterComponent,
        CrisisListComponent,
        CrisisDetailComponent,
        CrisisCenterHomeComponent,
    ],
})
export class CrisisCenterModule {}
