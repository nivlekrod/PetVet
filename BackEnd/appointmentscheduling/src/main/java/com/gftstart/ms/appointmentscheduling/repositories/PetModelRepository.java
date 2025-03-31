package com.gftstart.ms.appointmentscheduling.repositories;

import com.gftstart.ms.appointmentscheduling.models.PetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PetModelRepository extends JpaRepository<PetModel, UUID> {
    Optional<PetModel> findByPetId(UUID petId);

}
