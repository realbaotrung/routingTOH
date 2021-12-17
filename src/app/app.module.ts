import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrisisCenterModule } from './crisis-center/crisis-center.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent, ComposeMessageComponent } from './index';

import { MessageService } from './message.service';
import { HeroService } from './heroes/hero.service';
import { DialogService } from './dialog.service';
import { CrisisService } from './crisis-center/crisis.service';
import { AuthService } from './auth/auth.service';
import { CrisisDetailResolverService } from './crisis-center/crisis-detail-resolver.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HeroesModule, // the order is very important!!!
        CrisisCenterModule,
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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
