import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable, switchMap } from 'rxjs';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
    hero$?: Observable<Hero>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: HeroService,
    ) {}

    ngOnInit(): void {
        this.hero$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.service.getHero(parseInt(params.get('id')!, 10))),
        );
    }

    gotoHeroes(hero: Hero) {
        const heroId = hero ? hero.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero
        // Includes a junk 'foo' property for fun
        this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
    }
}
