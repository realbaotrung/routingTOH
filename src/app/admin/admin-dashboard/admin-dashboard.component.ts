import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectivePreloadingStrategyService } from '../../selective-preloading-strategy.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
    sessionId!: Observable<string>;
    token!: Observable<string>;
    modules: string[] = [];

    constructor(
        private route: ActivatedRoute,
        public preloadStrategy: SelectivePreloadingStrategyService,
    ) {}

    ngOnInit(): void {
        this.modules = this.preloadStrategy.preloadedModules;

        // Capture the session ID if available
        this.sessionId = this.route.queryParamMap.pipe(
            map(params => params.get('session_id') || 'None'),
        );

        // Capture the fragment if available
        this.token = this.route.fragment.pipe(map(fragment => fragment || 'None'));
    }
}
