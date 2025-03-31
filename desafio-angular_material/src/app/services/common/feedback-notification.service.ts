import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class FeedbackNotificationService {

    constructor(private snackBar: MatSnackBar) { }

    showSuccess(message: string, duration = 3000): void {
        this.snackBar.open(message, 'Fechar', {
            duration,
            panelClass: ['snackbar-success'],
        });
    }

    showError(message: string, duration = 3000): void {
        this.snackBar.open(message, 'Fechar', {
            duration,
            panelClass: ['snackbar-error'],
        });
    }
}
