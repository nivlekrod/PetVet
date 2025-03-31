package com.gftstart.ms.petregister.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetImagesUrlDTO { // estrutura https://api.thecatapi.com/v1/images/O3btzLlsO

    @JsonProperty("id")
    private String referenceImageId;

    @JsonProperty("url")
    private String url;
}
