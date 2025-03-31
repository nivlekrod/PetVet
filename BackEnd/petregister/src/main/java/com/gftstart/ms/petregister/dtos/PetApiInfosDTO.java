package com.gftstart.ms.petregister.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetApiInfosDTO { // estrutura https://api.thecatapi.com/v1/breeds

    @JsonProperty("name") // na api externa é o nome da raça
    private String breed;

    @JsonProperty("reference_image_id")
    private String referenceImage;

    @JsonProperty("temperament")
    private String temperament;
}
