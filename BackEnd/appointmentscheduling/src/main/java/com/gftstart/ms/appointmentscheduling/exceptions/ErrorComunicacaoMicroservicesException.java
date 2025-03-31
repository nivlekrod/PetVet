package com.gftstart.ms.appointmentscheduling.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class ErrorComunicacaoMicroservicesException extends RuntimeException {
    @Getter
    private Integer status;

    public ErrorComunicacaoMicroservicesException(String message, Integer status) {
        super(message);
        this.status = status;
    }
}
