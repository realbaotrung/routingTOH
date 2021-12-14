import { Component } from '@angular/core';
import { slideInAnimation } from './animation';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [slideInAnimation],
})
export class AppComponent {
    title = 'router-toh';

    getAnimationData(outlet: RouterOutlet) {
        return outlet?.activatedRouteData?.['animation'];
    }
}
