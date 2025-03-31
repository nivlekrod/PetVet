package com.gftstart.ms.appointmentscheduling.dtos;

import com.gftstart.ms.appointmentscheduling.enums.ServiceType;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class AppointmentSchedulingDTO {
    private UUID petId;
    private ServiceType serviceType;
    private LocalDate appointmentDate;
    private String notes;
}