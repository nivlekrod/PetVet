import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        RouterModule,
        MatNavList,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatToolbar
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'desafio-angular_material';

    isSmallScreen = false;

    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.isSmallScreen = result.matches;
        });
    }

    // isHandset = false;

    // constructor(private breakpointObserver: BreakpointObserver) {
    //     this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
    //         this.isHandset = result.matches;
    //     });
    // }
}
