import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from '../../../models/appointment/appointment.model';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-appointment-card',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.css'
})
export class AppointmentCardComponent {
    appointment: Appointment = inject(MAT_DIALOG_DATA);
    private dialogRef = inject(MatDialogRef<AppointmentCardComponent>);
    private dialog = inject(MatDialog);

    closeDialog(): void {
        this.dialogRef.close();
    }

    editAppointment(): void {
        this.dialogRef.close({ action: 'edit', appointment: this.appointment });
    }

    deleteAppointment(): void {
        const confirmRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: `Deseja realmente excluir o agendamento do pet "${this.appointment.pet.name}"?`,
                confirmText: 'Excluir',
            },
        });

        confirmRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.dialogRef.close({ action: 'delete', appointment: this.appointment });
            }
        });
    }
}
