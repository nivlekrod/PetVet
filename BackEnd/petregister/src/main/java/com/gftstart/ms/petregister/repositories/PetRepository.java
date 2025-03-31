package com.gftstart.ms.petregister.repositories;

import com.gftstart.ms.petregister.models.PetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PetRepository extends JpaRepository<PetModel, UUID> {
    List<PetModel> findByBreedIgnoreCase(String breed);

    @Query("SELECT p FROM PetModel p WHERE LOWER(p.species) = LOWER(:species)")
    List<PetModel> findBySpeciesIgnoreCase(String species);

    @Query("SELECT p FROM PetModel p WHERE LOWER(p.species) = LOWER(:species) AND LOWER(p.breed) = LOWER(:breed)")
    List<PetModel> findBySpeciesAndBreedIgnoreCase(@Param("species") String species, @Param("breed") String breed);

    /// TENTAR FAZER O ENUM IGNORAR CASE

//    List<PetModel> findBySpecies(Species species);
//
//    /// CORRIGIR ///
//    List<PetModel> findBySpeciesAndBreed(Species species, String breed);
}
