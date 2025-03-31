package com.gftstart.ms.petregister.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PetBadRequestException extends RuntimeException {
  public PetBadRequestException(String message) {
    super(message);
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
