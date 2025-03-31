package com.gftstart.ms.appointmentscheduling.controllers;

import com.gftstart.ms.appointmentscheduling.dtos.AppointmentSchedulingDTO;
import com.gftstart.ms.appointmentscheduling.models.AppointmentSchedulingModel;
import com.gftstart.ms.appointmentscheduling.services.impl.AppointmentSchedulingServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/appointments")
public class AppoimentSchedulingController {

    private final AppointmentSchedulingServiceImpl appointmentService;

    @Operation(summary = "Criação de agendamento manual", description = "Cria um novo agendamento manual para o pet informado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Agendamento criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida"),
            @ApiResponse(responseCode = "500", description = "Erro ao acessar o banco de dados"),
            @ApiResponse(responseCode = "503", description = "Serviço indisponível")
    })
    @PostMapping("/manual")
    public ResponseEntity<AppointmentSchedulingModel> createManualAppointments(@RequestBody AppointmentSchedulingDTO request) {
        AppointmentSchedulingModel appointment = appointmentService.createManualAppointment(
                request.getPetId(),
                request.getServiceType(),
                request.getAppointmentDate(),
                request.getNotes()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
    }

    @Operation(summary = "Listar agendamentos", description = "Obtém todos os agendamentos gerados para o pet informado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agendamentos retornados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao acessar o banco de dados")
    })
    @GetMapping
    public ResponseEntity<List<AppointmentSchedulingModel>> getAppointments(@RequestParam UUID petId) {
        List<AppointmentSchedulingModel> appointments = appointmentService.getAppointmentsByPetId(petId);
        return ResponseEntity.ok(appointments);
    }

    @Operation(summary = "Atualização de agendamento", description = "Atualiza as informações de um agendamento existente pelo ID fornecido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agendamento atualizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Agendamento não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao acessar o banco de dados")
    })
    @PutMapping("/{id}")
    public ResponseEntity<AppointmentSchedulingModel> updateAppointment(@PathVariable UUID id, @RequestBody AppointmentSchedulingDTO request) {
        AppointmentSchedulingModel updatedScheduling = appointmentService.updateAppointment(id, request);
        return ResponseEntity.ok(updatedScheduling);
    }

    @Operation(summary = "Deleção de agendamento", description = "Remove um agendamento existente pelo ID fornecido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agendamento deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Agendamento não encontrado"),
            @ApiResponse(responseCode = "500", description = "Erro ao acessar o banco de dados")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable UUID id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted!");
    }

    @Operation(summary = "Listar todos os agendamentos", description = "Retorna todos os agendamentos existentes no sistema.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Agendamentos retornados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao acessar o banco de dados")
    })
    @GetMapping("/all")
    public ResponseEntity<List<AppointmentSchedulingModel>> getAllAppointments() {
        List<AppointmentSchedulingModel> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }
}
