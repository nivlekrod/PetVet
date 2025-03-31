package com.gftstart.ms.appointmentscheduling.services;

import com.gftstart.ms.appointmentscheduling.dtos.AppointmentSchedulingDTO;
import com.gftstart.ms.appointmentscheduling.enums.ServiceType;
import com.gftstart.ms.appointmentscheduling.models.AppointmentSchedulingModel;
import com.gftstart.ms.appointmentscheduling.models.PetModel;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AppointmentSchedulingService {

    // Agendamento Automatico
    LocalDate generateRandomAppointmentDate(int minDaysAhead, int maxDaysAhead);
    LocalDate calculateRandomDateForService(ServiceType serviceType);
    AppointmentSchedulingModel createAutomaticAppointment(PetModel pet, ServiceType serviceType, String notes);
    void generatePetAppointments(PetModel pet);

    // Agendamento Manual
    AppointmentSchedulingModel createManualAppointment(UUID petId, ServiceType serviceType, LocalDate appointmentDate, String notes);

    List<AppointmentSchedulingModel> getAllAppointments();
    List<AppointmentSchedulingModel> getAppointmentsByPetId(UUID petId);
    AppointmentSchedulingModel updateAppointment(UUID id, AppointmentSchedulingDTO request);
    void deleteAppointment(UUID id);

}
