import { FeedbackNotificationService } from './../../../services/common/feedback-notification.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject } from '@angular/core';
import { Pet } from '../../../models/pet/pet.model';
import { PetService } from '../../../services/pet/pet.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-pet-list',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './pet-list.component.html',
    styleUrl: './pet-list.component.css'
})
export class PetListComponent {
    private petService = inject(PetService);
    private feedback = inject(FeedbackNotificationService);
    private dialog = inject(MatDialog);
    private fb = inject(FormBuilder);

    pets: Pet[] = [];
    allPets: Pet[] = [];

    filterForm: FormGroup = this.fb.group({
        name: [''],
        species: [''],
        breed: [''],
    });

    constructor() {
        this.loadPets();
    }

    loadPets(): void {
        this.petService.getAllPets().subscribe({
            next: (pets) => {
                this.pets = pets;
                this.allPets = pets;
            },
            error: (err) => {
                console.error('Erro ao buscar pets:', err);
            }
        });
    }

    filterPets(): void {
        const { name, species, breed } = this.filterForm.value;

        this.pets = this.allPets.filter((pet) =>
            (!name || pet.name.toLowerCase().includes(name.toLowerCase())) &&
            (!species || pet.species === species) &&
            (!breed || pet.breed.toLowerCase().includes(breed.toLowerCase()))
        );
    }

    resetFilters(): void {
        this.filterForm.reset();
        this.pets = [...this.allPets];
    }

    viewDetails(pet: Pet): void {
        const dialogRef = this.dialog.open(PetCardComponent, {
            data: pet,
            width: '90vw',
            maxWidth: '650px',
            maxHeight: '90vh',
            panelClass: 'modal-form'
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result?.action === 'delete') {
                this.deletePet(result.pet.petId);
                this.loadPets();
            } else if (result?.action === 'edit') {
                this.openEditModal(result.pet);
            }
        });
    }

    openEditModal(pet: Pet): void {
        const dialogRef = this.dialog.open(PetFormComponent, {
            panelClass: 'modal-form',
            width: '90vw',
            maxWidth: '700px',
            maxHeight: '90vh',
            data: pet
        });


        dialogRef.afterClosed().subscribe(() => {
            this.loadPets();
        });

        console.log('Abrir modal de edição para:', pet);
    }

    deletePet(petId: string): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                message: 'Tem certeza que deseja excluir este pet?',
            },
        });

        dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                this.petService.deletePet(petId).subscribe({
                    next: () => {
                        this.loadPets()
                        this.feedback.showSuccess('Pet Deletado!');
                    },
                    error: (err) => {
                        this.feedback.showError('Falha ao deletar pet.');
                        console.error('Erro ao deletar pet:', err)
                    },
                });
            }
        });
    }
}
