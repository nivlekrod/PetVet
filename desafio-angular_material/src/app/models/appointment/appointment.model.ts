import { Pet } from "../pet/pet.model";
import { AppointmentOrigin } from "./appointment-origin.enum";

export interface Appointment {
    appointmentId?: string; // UUID gerado automaticamente
    serviceType: string;
    appointmentDate: string; // formato ISO string
    origin: AppointmentOrigin;
    pet: Pet;
    notes?: string;
}
