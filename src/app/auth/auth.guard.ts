import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    NavigationExtras,
    Route,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }

    canLoad(
        route: Route,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url = `/${route.path}`;
        return this.checkLogin(url);
    }

    private checkLogin(url: string): Observable<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Create a dummy session id
        const sessionId = 123456789;

        // Set our navigation extras object
        // that contains our global query params and fragment
        const navigationExtra: NavigationExtras = {
            queryParams: { session_id: sessionId },
            fragment: 'anchor',
        };
        // Redirect to the login page
        // return an UrlTree, tell Router to cancel the current navigation and
        // schedule a new one ('login' page) to redirect the user
        // return this.router.parseUrl('/login');
        this.router.navigate(['/login'], navigationExtra);
        return false;
    }
}
