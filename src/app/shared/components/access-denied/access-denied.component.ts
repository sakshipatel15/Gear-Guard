import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-access-denied',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent {

    constructor(private location: Location, private router: Router) { }

    goBack() {
        this.location.back();
    }

    goHome() {
        this.router.navigate(['/home']); // Or dashboard
    }
}
