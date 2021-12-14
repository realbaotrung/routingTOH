import { Injectable } from '@angular/core';

import { Observable, map, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from '../message.service';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    constructor(private messageService: MessageService) {}

    getHeroes(): Observable<Hero[]> {
        // TODO: send the message _after_ fetching the heroes
        this.messageService.add('HeroService: fetched heroes');
        return of(HEROES);
    }

    getHero(id: number | string): Observable<Hero> {
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return this.getHeroes().pipe(
            // parseInt("2") === Number("id") === +"2" === 2
            map((heroes: Hero[]) => heroes.find(hero => hero.id === +id)!),
        );
    }
}
