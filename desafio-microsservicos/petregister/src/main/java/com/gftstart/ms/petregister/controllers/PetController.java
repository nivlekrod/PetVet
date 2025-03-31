package com.gftstart.ms.petregister.controllers;

import com.gftstart.ms.petregister.enums.Species;
import com.gftstart.ms.petregister.models.PetModel;
import com.gftstart.ms.petregister.services.PetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pets")
@Tag(name = "petregister-api")
public class PetController {

    private final PetService petService;

    @Operation(summary = "Cria um novo Pet")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Pet criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "500", description = "Erro ao acessar o banco de dados")
    })
    @PostMapping
    public ResponseEntity<PetModel> createPet(@RequestBody PetModel pet) {
        PetModel createdPet = petService.createPet(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
    }

    @Operation(summary = "Busca um Pet pelo ID", description = "Retorna um Pet específico com base no ID fornecido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pet encontrado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Pet não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao acessar o banco de dados")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PetModel> getPetById(@PathVariable("id") UUID id) {
        PetModel pet = petService.getPetById(id);
        return ResponseEntity.status(HttpStatus.OK).body(pet);
    }

    @Operation(summary = "Lista todos os Pets", description = "Retorna uma lista de todos os pets registrados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de Pets retornada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Nenhum pet encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping
    public ResponseEntity<List<PetModel>> getAllPets() {
        List<PetModel> pets = petService.getAllPets();
        return ResponseEntity.status(HttpStatus.OK).body(pets);
    }

    // Tentar fazer enum ignorar o case e corrigir url?
    @Operation(summary = "Busca Pets por espécie ou raça", description = "Retorna uma lista de pets filtrada pela raça e/ou especie informada.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de Pets filtrada"),
            @ApiResponse(responseCode = "400", description = "Parâmetros de filtro inválidos"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @GetMapping("/filter")
    public ResponseEntity<List<PetModel>> searchPetsBySpeciesOrBreed(@RequestParam(value = "species", required = false) Species species,
                                                                     @RequestParam(value = "breed", required = false) String breed) {
        List<PetModel> pets;

        if (species != null && breed != null) {
            pets = petService.searchPetsBySpeciesAndBreed(species, breed);
            return ResponseEntity.status(HttpStatus.OK).body(pets);
        } else if (breed != null) {
            pets = petService.searchPetsByBreed(breed);
            return ResponseEntity.status(HttpStatus.OK).body(pets);
        } else if (species != null) {
            pets = petService.searchPetsBySpecies(species);
            return ResponseEntity.status(HttpStatus.OK).body(pets);
        } else {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
    }

    @Operation(summary = "Atualiza os dados de um Pet", description = "Atualiza os dados de um pet com base no ID fornecido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pet atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Pet não encontrado"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PutMapping("/{id}")
    public ResponseEntity<PetModel> updatePet(@PathVariable("id") UUID id, @RequestBody PetModel pet) {
        PetModel updatedPet = petService.updatePet(id, pet);
        return ResponseEntity.status(HttpStatus.OK).body(updatedPet);
    }

    @Operation(summary = "Deleta um Pet", description = "Remove um pet do sistema com base no ID fornecido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pet deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Pet não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable("id") UUID id) {
        petService.deletePet(id);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted!");
    }
}