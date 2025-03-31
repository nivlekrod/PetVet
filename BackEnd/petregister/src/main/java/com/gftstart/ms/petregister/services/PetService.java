package com.gftstart.ms.petregister.services;

import com.gftstart.ms.petregister.enums.Species;
import com.gftstart.ms.petregister.models.PetModel;

import java.util.List;
import java.util.UUID;

public interface PetService {

    PetModel createPet(PetModel pet);
    PetModel getPetById(UUID id);
    List<PetModel> getAllPets();
    PetModel updatePet(UUID id, PetModel pet);
    void deletePet(UUID id);

    List<PetModel> searchPetsByBreed(String breed);
    List<PetModel> searchPetsBySpecies(Species species);
    List<PetModel> searchPetsBySpeciesAndBreed(Species species, String breed);

    List<String> getAllDogsBreeds();
    List<String> getAllCatsBreeds();
    String getCatImage(String breed);
    String getDogImage(String breed);

}
