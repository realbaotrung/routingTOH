import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
    heroes$!: Observable<Hero[]>;
    selectedId = 0;

    constructor(private heroService: HeroService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.heroes$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.selectedId = parseInt(params.get('id')!, 10);
                return this.heroService.getHeroes();
            }),
        );
    }
}
