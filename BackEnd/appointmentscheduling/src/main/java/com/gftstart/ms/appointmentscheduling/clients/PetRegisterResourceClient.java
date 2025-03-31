package com.gftstart.ms.appointmentscheduling.clients;

import com.gftstart.ms.appointmentscheduling.dtos.PetDataDTO;
import com.gftstart.ms.appointmentscheduling.models.PetModel;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(value = "petregister", path = "/api/pets")
public interface PetRegisterResourceClient {

    @GetMapping("/{id}")
    ResponseEntity<PetDataDTO> getPetById(@PathVariable("id") UUID id);
}
