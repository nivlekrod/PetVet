import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, inject } from '@angular/core';
import { ServiceType } from '../../../models/appointment/service-type.enum';
import { Pet } from '../../../models/pet/pet.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FeedbackNotificationService } from '../../../services/common/feedback-notification.service';
import { PetService } from '../../../services/pet/pet.service';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { Appointment } from '../../../models/appointment/appointment.model';
import { AppointmentOrigin } from '../../../models/appointment/appointment-origin.enum';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpErrorResponse } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-appointment-form',
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
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './appointment-form.component.html',
    styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent {
    private fb = inject(FormBuilder);
    private service = inject(AppointmentService);
    private petService = inject(PetService);
    private feedbackService = inject(FeedbackNotificationService);
    private location = inject(Location);
    private dialogRef = inject(MatDialogRef<AppointmentFormComponent>, { optional: true });
    private appointment = inject<Appointment | null>(MAT_DIALOG_DATA, { optional: true });

    // Propriedades
    appointmentForm: FormGroup;
    pets: Pet[] = [];
    serviceTypes = Object.values(ServiceType);
    isEditMode = false;
    isLoading = false;
    editingAppointmentId: string | null = null;

    constructor() {
        this.appointmentForm = this.createForm();
        this.loadPets(() => {
            if (this.appointment) {
                this.setEditMode(this.appointment);
            }
        });
    }

    private createForm(): FormGroup {
        return this.fb.group({
            serviceType: ['', Validators.required],
            appointmentDate: ['', Validators.required],
            pet: [null, Validators.required],
            notes: ['']
        });
    }

    private loadPets(afterLoad?: () => void): void {
        this.petService.getAllPets().subscribe({
            next: (data) => {
                this.pets = data;
                afterLoad?.();
            },
            error: (err) => console.error('Erro ao buscar pets:', err)
        });
    }

    submit(): void {
        if (this.appointmentForm.invalid) {
            this.appointmentForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;

        const formValue = this.appointmentForm.value;

        const appointmentData: Appointment = {
            appointmentId: this.editingAppointmentId ?? undefined,
            serviceType: formValue.serviceType,
            appointmentDate: formValue.appointmentDate!,
            pet: formValue.pet!,
            origin: AppointmentOrigin.MANUAL,
            notes: formValue.notes ?? ''
        };

        const operation = this.isEditMode && this.editingAppointmentId
            ? this.service.updateAppointment(this.editingAppointmentId, appointmentData)
            : this.service.createAppointment(appointmentData);

        operation.subscribe({
            next: () => this.handleSuccessfulSubmission(),
            error: (error: HttpErrorResponse) => this.handleSubmissionError(error)
        });
    }

    private handleSuccessfulSubmission(): void {
        const message = this.isEditMode
            ? 'Agendamento atualizado com sucesso!'
            : 'Agendamento criado com sucesso!';

        this.feedbackService.showSuccess(message);

        this.dialogRef?.close();

        if (!this.isEditMode) {
            this.resetForm();
        }

        this.isLoading = false;
    }

    private handleSubmissionError(error: HttpErrorResponse): void {
        const message = this.isEditMode
            ? 'Erro ao atualizar agendamento'
            : 'Erro ao criar agendamento';

        this.feedbackService.showError(message);

        console.error('Erro no processamento do agendamento:', error);

        this.isLoading = false;
    }

    setEditMode(appointment: Appointment): void {
        const matchingPet = this.pets.find(p => p.petId === appointment.pet?.petId) ?? null;

        this.appointmentForm.patchValue({
            serviceType: appointment.serviceType,
            appointmentDate: appointment.appointmentDate,
            pet: matchingPet,
            notes: appointment.notes ?? ''
        });

        this.isEditMode = true;
        this.editingAppointmentId = appointment.appointmentId ?? null;
    }

    resetForm(): void {
        this.appointmentForm.reset();
        this.isEditMode = false;
        this.editingAppointmentId = null;
    }

    goBack(): void {
        this.location.back();
    }

    closeDialog(): void {
        this.dialogRef?.close();
    }
}