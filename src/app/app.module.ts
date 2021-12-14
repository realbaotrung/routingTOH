import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HeroesModule, // the order is very important!!!
        AppRoutingModule,
    ],
    declarations: [AppComponent, CrisisListComponent, PageNotFoundComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
