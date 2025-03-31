import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment } from '../../models/appointment/appointment.model';
import { AppointmentOrigin } from '../../models/appointment/appointment-origin.enum';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = `http://localhost:8080/api/appointments`;

    constructor(private client: HttpClient) { }

    getAllAppointments(): Observable<Appointment[]> {
        return this.client.get<any[]>(`${this.apiUrl}/all`).pipe(
            map(appointments => {
                return appointments
                    .map(appointment => {
                        console.log('📦 Resposta do Backend:', appointment); // 👈 Adicione isso

                        return {
                            ...appointment,
                            pet: appointment.petModel, // Ajusta o nome da propriedade vinda do backend
                            origin: appointment.notes?.startsWith('[AUTO]')
                                ? AppointmentOrigin.AUTOMATIC
                                : AppointmentOrigin.MANUAL
                        };
                    })
                    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()); // Ordena por data (mais antiga → mais recente)
            })

        );
    }

    getAppointments(petId: string): Observable<Appointment[]> {
        return this.client.get<any[]>(`${this.apiUrl}?petId=${petId}`).pipe(
            map((data) =>
                data.map((item) => ({
                    ...item,
                    pet: item.petModel,
                    origin: AppointmentOrigin.AUTOMATIC
                }))
            )
        );
    }

    createAppointment(appointment: Appointment): Observable<Appointment> {
        const { origin, pet, ...rest } = appointment;

        const body = {
            petId: pet.petId,
            serviceType: appointment.serviceType,
            appointmentDate: appointment.appointmentDate,
            notes: appointment.notes
        };

        return this.client.post<Appointment>(`${this.apiUrl}/manual`, body);
    }


    updateAppointment(id: string, appointment: Appointment): Observable<Appointment> {
        const isAuto = appointment.origin === AppointmentOrigin.AUTOMATIC;

        // Se for AUTOMATIC, adiciona um marcador [AUTO] na observação
        const notes = isAuto
            ? appointment.notes?.includes('[AUTO]')
                ? appointment.notes // já marcado
                : `[AUTO] ${appointment.notes ?? ''}`.trim()
            : appointment.notes?.replace('[AUTO]', '').trim(); // remove marcador se não for automático

        const body = {
            serviceType: appointment.serviceType,
            appointmentDate: appointment.appointmentDate,
            petId: appointment.pet?.petId, // 👈 apenas o ID!
            notes
        };


        return this.client.put<Appointment>(`${this.apiUrl}/${id}`, body);
    }


    deleteAppointment(id: string): Observable<string> {
        return this.client.delete(`${this.apiUrl}/${id}`, {
            responseType: 'text' as const
        });
    }
}
