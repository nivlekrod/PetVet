package com.gftstart.ms.appointmentscheduling.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AppointmentDataAccessException extends RuntimeException {
    public AppointmentDataAccessException(String message) {
        super(message);
    }

    public AppointmentDataAccessException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }

    @Override
    public String toString() {
        return getMessage();
    }
}
