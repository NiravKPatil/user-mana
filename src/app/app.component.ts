import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User, Role } from './models';

@Component({ 
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    user: User;

    constructor(private authenticationService: AuthenticationService,
        private router : Router) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
    }
    
    admin() {
        this.router.navigate(['/admin']);
    }
    
    userClick() {
        this.router.navigate(['/user']);
    }
    
    home() {
        this.router.navigate(['/']);
    }
}