import { Component, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../../models/pet/pet.model';
import { Species } from '../../../models/pet/species.enum';
import { PetService } from '../../../services/pet/pet.service';
import { FeedbackNotificationService } from '../../../services/common/feedback-notification.service';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-pet-form',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './pet-form.component.html',
    styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
    private fb = inject(FormBuilder);
    private petService = inject(PetService);
    private feedbackService = inject(FeedbackNotificationService);
    private location = inject(Location);
    private dialogRef = inject(MatDialogRef<PetFormComponent>, { optional: true });
    private pet = inject(MAT_DIALOG_DATA, { optional: true });

    petForm: FormGroup;
    isEditMode = false;
    isLoading = false;
    speciesOptions = Object.values(Species);
    editingPetId: string | null = null;

    constructor() {
        this.petForm = this.createForm();

        if (this.pet) {
            this.setEditMode(this.pet);
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            species: ['', Validators.required],
            breed: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            age: [null, [Validators.required, Validators.min(0)]],
            weight: [null, [Validators.required, Validators.min(0)]],
            color: ['', [Validators.required]],
            description: ['', [Validators.maxLength(250)]],
            tutor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            emailTutor: ['', [Validators.required, Validators.email]]
        });
    }

    submit(): void {
        if (this.petForm.invalid) {
            this.petForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;

        const petData: Pet = this.petForm.value;

        const petOperation = this.isEditMode && this.editingPetId
            ? this.petService.updatePet(this.editingPetId, petData)
            : this.petService.createPet(petData);

        petOperation.subscribe({
            next: () => {
                this.handleSuccessfulSubmission();
            },
            error: (error: HttpErrorResponse) => {
                this.handleSubmissionError(error);
            }
        });
    }

    private handleSuccessfulSubmission(): void {
        const successMessage = this.isEditMode
            ? 'Pet atualizado com sucesso!'
            : 'Pet cadastrado com sucesso!';

        this.feedbackService.showSuccess(successMessage);

        this.dialogRef?.close();

        if (!this.isEditMode) {
            this.resetForm();
        }

        this.isLoading = false;
    }

    private handleSubmissionError(error: HttpErrorResponse): void {
        const errorMessage = this.isEditMode
            ? 'Erro ao atualizar pet'
            : 'Erro ao cadastrar pet';

        this.feedbackService.showError(errorMessage);

        console.error('Erro no processamento do pet:', error);

        this.isLoading = false;
    }

    setEditMode(pet: Pet): void {
        this.petForm.patchValue({
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: pet.age,
            weight: pet.weight,
            color: pet.color,
            description: pet.description ?? '',
            tutor: pet.tutor,
            emailTutor: pet.emailTutor,
        });

        this.isEditMode = true;
        this.editingPetId = pet.petId ?? null;
    }

    resetForm(): void {
        this.petForm.reset();

        this.isEditMode = false;

        this.editingPetId = null;
    }

    goBack(): void {
        this.location.back();
    }

    closeDialog(): void {
        this.dialogRef?.close();
    }
}
