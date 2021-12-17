import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    message: string;

    constructor(public authService: AuthService, public router: Router) {}

    ngOnInit(): void {
        this.message = this.getMessage();
    }

    getMessage() {
        return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ...';

        this.authService.login().subscribe(() => {
            this.message = this.getMessage();

            if (this.authService.isLoggedIn) {
                // Usually you would use the redirect URL from the auth service.
                // However, to keep the example simple, we will always redirect to `/admin`
                const redirectUrl = '/admin';

                // Set our navigation extras object
                // that passes on our global query params and fragment
                const navigationExtra: NavigationExtras = {
                    queryParamsHandling: 'preserve',
                    preserveFragment: true,
                };
                // Redirect the user
                this.router.navigate([redirectUrl], navigationExtra);
            }
        });
    }

    logout() {
        this.authService.logout();
        this.message = this.getMessage();
    }
}
