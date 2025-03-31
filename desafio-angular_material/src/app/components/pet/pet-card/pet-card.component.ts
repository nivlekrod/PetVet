import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Pet } from '../../../models/pet/pet.model';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-pet-card',
    imports: [
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './pet-card.component.html',
    styleUrl: './pet-card.component.css'
})
export class PetCardComponent {
    pet: Pet = inject(MAT_DIALOG_DATA);
    private dialogRef = inject(MatDialogRef<PetCardComponent>);
    private dialog = inject(MatDialog);

    closeDialog(): void {
        this.dialogRef.close();
    }

    editPet(): void {
        this.dialogRef.close({ action: 'edit', pet: this.pet });
    }

    deletePet(): void {
        const confirmRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                message: `Deseja realmente excluir o pet "${this.pet.name}"?`,
                confirmText: 'Excluir',
            },
        });

        confirmRef.afterClosed().subscribe((result) => {
            this.dialogRef.close({ action: 'delete', pet: this.pet });
        });
    }
}
