package com.gftstart.ms.appointmentscheduling.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gftstart.ms.appointmentscheduling.enums.ServiceType;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "TB_APPOINTMENTS")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppointmentSchedulingModel implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID appointmentId;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    private LocalDate appointmentDate;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonProperty("petModel")
    private PetModel petModel;

    private String notes;

}
