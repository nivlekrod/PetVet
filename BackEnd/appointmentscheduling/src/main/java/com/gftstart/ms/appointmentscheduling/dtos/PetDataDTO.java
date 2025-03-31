package com.gftstart.ms.appointmentscheduling.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gftstart.ms.appointmentscheduling.enums.Species;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class PetDataDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private UUID petId;
    private String name;
    private Species species;
    private String breed;
    private Integer age;
    private Double weight;
    private String tutor;
    private String emailTutor;
}
