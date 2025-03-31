package com.gftstart.ms.petregister.events;

import com.gftstart.ms.petregister.enums.Species;
import com.gftstart.ms.petregister.models.PetModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetCreatedEvent implements Serializable {
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

    public PetCreatedEvent(PetModel pet) {
        BeanUtils.copyProperties(pet, this);
    }
}
