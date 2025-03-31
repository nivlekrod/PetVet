import { Component, inject } from '@angular/core';
import { Pet } from '../../../models/pet/pet.model';
import { Appointment } from '../../../models/appointment/appointment.model';
import { ServiceType } from '../../../models/appointment/service-type.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { PetService } from '../../../services/pet/pet.service';
import { FeedbackNotificationService } from '../../../services/common/feedback-notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-appointment-list',
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './appointment-list.component.html',
    styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
    private appointmentService = inject(AppointmentService);
    private petService = inject(PetService);
    private feedback = inject(FeedbackNotificationService);
    private dialog = inject(MatDialog);
    private fb = inject(FormBuilder);
  
    appointments: Appointment[] = [];
    allAppointments: Appointment[] = [];
    pets: Pet[] = [];
    serviceTypes = Object.values(ServiceType);
  
    filterForm: FormGroup = this.fb.group({
      pet: [''],
      serviceType: [''],
      appointmentDate: ['']
    });
  
    constructor() {
      this.loadAppointments();
      this.loadPets();
    }
  
    loadAppointments(): void {
      this.appointmentService.getAllAppointments().subscribe({
        next: (data) => {
          this.allAppointments = data;
          this.appointments = [...data];
        },
        error: (err) => {
          console.error('Erro ao carregar agendamentos:', err);
          this.feedback.showError('Erro ao carregar agendamentos.');
        }
      });
    }
  
    loadPets(): void {
      this.petService.getAllPets().subscribe({
        next: (data) => this.pets = data,
        error: (err) => console.error('Erro ao carregar pets:', err)
      });
    }
  
    filterAppointments(): void {
      const { pet, serviceType, appointmentDate } = this.filterForm.value;
  
      this.appointments = this.allAppointments.filter(appointment =>
        (!pet || appointment.pet?.petId === pet) &&
        (!serviceType || appointment.serviceType === serviceType) &&
        (!appointmentDate || appointment.appointmentDate === appointmentDate)
      );
    }
  
    resetFilters(): void {
      this.filterForm.reset();
      this.appointments = [...this.allAppointments];
    }
  
    viewDetails(appointment: Appointment): void {
      const dialogRef = this.dialog.open(AppointmentCardComponent, {
        data: appointment,
        width: '90vw',
        maxWidth: '700px',
        maxHeight: '90vh',
        panelClass: 'modal-form'
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.action === 'delete') {
          this.deleteAppointment(result.appointment.appointmentId);
        } else if (result?.action === 'edit') {
          this.openEditModal(result.appointment);
        }
      });
    }
  
    openEditModal(appointment: Appointment): void {
      const dialogRef = this.dialog.open(AppointmentFormComponent, {
        width: '90vw',               
        maxWidth: '700px',           
        maxHeight: '90vh',           
        panelClass: 'modal-form',  
        data: appointment
      });      
  
      dialogRef.afterClosed().subscribe(() => {
        this.loadAppointments();
      });
    }
  
    deleteAppointment(appointmentId: string): void {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: {
          message: 'Tem certeza que deseja excluir este agendamento?'
        }
      });
  
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.appointmentService.deleteAppointment(appointmentId).subscribe({
            next: () => {
              this.feedback.showSuccess('Agendamento deletado com sucesso!');
              this.loadAppointments();
            },
            error: (err) => {
              this.feedback.showError('Erro ao deletar agendamento.');
              console.error('Erro:', err);
            }
          });
        }
      });
    }
}
