import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent, ComposeMessageComponent } from './index';

import { MessageService } from './message.service';
import { HeroService } from './heroes/hero.service';
import { DialogService } from './dialog.service';
import { CrisisService } from './crisis-center/crisis.service';
import { AuthService } from './auth/auth.service';
import { CrisisDetailResolverService } from './crisis-center/crisis-detail-resolver.service';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HeroesModule, // the order is very important!!!
        AuthModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent, PageNotFoundComponent, ComposeMessageComponent],
    providers: [
        HeroService,
        CrisisService,
        MessageService,
        DialogService,
        AuthService,
        CrisisDetailResolverService,
        SelectivePreloadingStrategyService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    // // Diagnostic only: inspect router configuration
    // constructor(router: Router) {
    //     // Use a custom replacer to display function names in the route configs
    //     const replacer = (key: any, value: any) => (typeof value === 'function') ? value.name : value;
    //
    //     console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    // }
}
